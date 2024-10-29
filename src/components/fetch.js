
export default DataFetcher = ({ endpoint, render }) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(endpoint);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const jsonData = await response.json();
          setData(jsonData);
        } catch (err) {
          setError(err);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, [endpoint]);
  
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    return <div>{render ? render(data) : <p>{JSON.stringify(data)}</p>}</div>;
  };
  