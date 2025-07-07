export const styles = {
  mainLayout: {
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
  },
  mainContent: {
    padding: '20px',
    minWidth: '100vw',
    margin: '0 auto',
  },
  title: {
    textAlign: 'center' as const,
    marginBottom: '20px',
  },
  analyzerContainer: {
    display: 'flex',
    width: '100%',
    height: '600px',
    margin: '0 auto',
    boxSizing: 'border-box' as const,
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  buttons: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '25px',
  },
};
