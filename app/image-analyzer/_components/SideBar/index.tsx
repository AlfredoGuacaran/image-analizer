'use client';

import React, { useState } from 'react';
import { Input, List, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './styles.module.css';

export interface Option {
  id: string;
  label: string;
  highlighted?: boolean;
}

interface SidebarProps {
  options?: Option[];
  onOptionSelect?: (option: Option) => void;
  onDiscard?: () => void;
  onConfirm?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  options = [
    { id: '1', label: 'Option 1', highlighted: true },
    { id: '2', label: 'Option 2' },
    { id: '3', label: 'Option 3' },
    { id: '4', label: 'Option 4' },
  ],
  onOptionSelect,
  onDiscard,
  onConfirm,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    options.find(opt => opt.highlighted) || null
  );

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onOptionSelect?.(option);
  };

  const handleDiscard = () => {
    setSelectedOption(null);
    onDiscard?.();
  };

  const handleConfirm = () => {
    onConfirm?.();
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.searchBar}>
        <Input
          placeholder="Search options..."
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          size="large"
        />
      </div>

      <List
        className={styles.optionsList}
        dataSource={filteredOptions}
        renderItem={option => (
          <List.Item
            className={`${styles.optionItem} ${
              selectedOption?.id === option.id ? styles.highlight : ''
            }`}
            onClick={() => handleOptionClick(option)}
          >
            {option.label}
          </List.Item>
        )}
      />

      <div className={styles.buttons}>
        <Space>
          <Button onClick={handleDiscard} size="large">
            Discard
          </Button>
          <Button
            type="primary"
            onClick={handleConfirm}
            size="large"
            disabled={!selectedOption}
          >
            Confirm
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default Sidebar;
