import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CircularProgress, Alert, Box } from '@mui/material';
import { getPackageVersionDetails } from '../api/npmApi';

const PackageVersionPage: React.FC = () => {
  const { packageName, version } = useParams<{ packageName?: string; version?: string }>();
  const [packageVersion, setPackageVersion] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackageVersion = async () => {
      if (packageName && version) {
        try {
          const data = await getPackageVersionDetails(packageName, version);
          setPackageVersion(data);
        } catch (err) {
          setError('Failed to fetch package version details');
        } finally {
          setLoading(false);
        }
      } else {
        setError('Package name or version is missing');
        setLoading(false);
      }
    };

    fetchPackageVersion();
  }, [packageName, version]);

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!packageVersion) {
    return (
      <Container>
        <Typography>No data available</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h4">Version: {packageVersion.version}</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {packageVersion.description}
          </Typography>
          {/* Add more details based on the API response */}
        </CardContent>
      </Card>
    </Container>
  );
};

export default PackageVersionPage;
