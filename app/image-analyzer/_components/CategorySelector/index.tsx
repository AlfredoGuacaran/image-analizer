'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { Input, List, Button, Space, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { styles } from './styles';
import { ImageCategory } from '@/interfaces/image-analiyzer';
import { roleMetricsServices } from '@/services/role-metrics/role-metrics.service';
import { useQuery } from '@tanstack/react-query';
import { GetImageCategoriesResponse } from '@/services/role-metrics/interfaces/role-metrics.interface';
import { roleMetricsQueryKeys } from '@/services/role-metrics/const/urls';
import useDebounce from '@/hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setSelectedCategory } from '@/redux/features/annotationSlice';
import { selectSelectedCategory } from '@/redux/selectors/annotationSelectors';

const CategorySelector = () => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(selectSelectedCategory);

  const { data: options, isLoading } = useQuery<GetImageCategoriesResponse>({
    queryKey: [roleMetricsQueryKeys.GET_IMAGE_CATEGORIES],
    queryFn: () => roleMetricsServices.getImageCategories(),
  });

  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredOptions = useMemo(() => {
    if (!options || !debouncedSearchTerm.trim()) {
      return options;
    }

    return options.filter(option =>
      option.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [options, debouncedSearchTerm]);

  const handleOptionClick = useCallback(
    (option: ImageCategory) => {
      dispatch(setSelectedCategory({ category: option }));
    },
    [dispatch]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  const renderListItem = useCallback(
    (option: ImageCategory, index: number) => (
      <List.Item
        style={{
          ...styles.optionItem,
          ...(selectedCategory?.id === option.id ? styles.highlight : {}),
          ...(index === (filteredOptions?.length ?? 0) - 1
            ? { borderBottom: 'none' }
            : {}),
        }}
        onClick={() => handleOptionClick(option)}
      >
        {option.name}
      </List.Item>
    ),
    [selectedCategory?.id, filteredOptions?.length, handleOptionClick]
  );

  return (
    <Col style={styles.sidebar}>
      <div style={styles.searchBar}>
        <Input
          placeholder="Search categories..."
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={handleSearchChange}
          size="large"
          allowClear
        />
      </div>

      <List
        style={{
          ...styles.optionsList,
          height: '400px',
          overflowY: 'auto',
        }}
        dataSource={filteredOptions}
        loading={isLoading}
        locale={{
          emptyText: searchTerm
            ? 'No categories found'
            : 'No categories available',
        }}
        rowKey="id"
        renderItem={renderListItem}
      />
    </Col>
  );
};

export default CategorySelector;
