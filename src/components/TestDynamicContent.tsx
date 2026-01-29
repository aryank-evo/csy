"use client"
import { useState } from 'react';
import { fetchCmsPage } from '@/utils/cmsApi';
import { useQuery } from '@tanstack/react-query';

const TestDynamicContent = () => {
  const [testMode, setTestMode] = useState('direct');
  
  // Test using React Query
  const { data: queryData, isLoading: queryLoading, error: queryError } = useQuery({
    queryKey: ['test-cms-page'],
    queryFn: () => fetchCmsPage('about-us'),
    enabled: testMode === 'query',
  });

  // Test using direct fetch
  const handleDirectTest = async () => {
    try {
      console.log('Testing direct API call...');
      const result = await fetchCmsPage('about-us');
      console.log('Direct API result:', result);
      alert('API call successful! Check console for details.');
    } catch (err) {
      console.error('Direct API error:', err);
      alert('API call failed! Check console for details.');
    }
  };

  return (
    <div className="p-4">
      <h2>API Connection Test</h2>
      
      <div className="mb-4">
        <button 
          onClick={handleDirectTest}
          className="btn btn-primary me-2"
        >
          Test Direct API Call
        </button>
        
        <button 
          onClick={() => setTestMode(testMode === 'query' ? 'direct' : 'query')}
          className="btn btn-secondary"
        >
          Toggle React Query Test (Current: {testMode})
        </button>
      </div>
      
      {testMode === 'query' && (
        <div>
          <h3>React Query Test</h3>
          {queryLoading && <p>Loading...</p>}
          {queryError && <p>Error: {queryError.message}</p>}
          {queryData && (
            <div>
              <p>Success! Data fetched:</p>
              <pre>{JSON.stringify(queryData, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
      
      <p className="mt-4 text-muted">
        Open your browser console to see API call logs.
        Click &ldquo;Test Direct API Call&rdquo; to verify connectivity.
      </p>
    </div>
  );
};

export default TestDynamicContent;