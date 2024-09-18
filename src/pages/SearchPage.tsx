import React, { useState } from 'react';
import { Container, Grid, Typography, Alert } from '@mui/material';
import SearchBar from '../components/SearchBar';
import PackageCard from '../components/PackageCard';
import { searchPackages } from '../api/npmApi';

const SearchPage: React.FC = () => {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchPackages(query);
      setPackages(data.objects);
    } catch (err) {
      setError('Failed to fetch packages');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <SearchBar onSearch={handleSearch} />
      {loading && <Typography variant="h6">Loading...</Typography>}
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={2}>
        {packages.map(pkg => (
          <Grid item xs={12} sm={6} md={4} key={pkg.package.name}>
            <PackageCard
              name={pkg.package.name}
              description={pkg.package.description}
              latestVersion={pkg.package.version}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SearchPage;
