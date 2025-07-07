export const styles = {
  sidebar: {
    width: '300px',
    backgroundColor: '#f0f0f0',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column' as const,
    boxSizing: 'border-box' as const,
  },
  searchBar: {
    marginBottom: '20px',
  },
  optionsList: {
    flexGrow: 1,
    overflowY: 'auto' as const,
    backgroundColor: 'white',
    borderRadius: '6px',
    border: '1px solid #d9d9d9',
  },
  optionItem: {
    padding: '12px 16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    borderBottom: '1px solid #f0f0f0',
  },
  optionItemLast: {
    padding: '12px 16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    borderBottom: 'none',
  },
  optionItemHover: {
    padding: '12px 16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    borderBottom: '1px solid #f0f0f0',
    backgroundColor: '#f5f5f5',
  },
  highlight: {
    backgroundColor: '#e6f7ff',
    borderLeft: '3px solid #1890ff',
    fontWeight: 500,
  },
};
