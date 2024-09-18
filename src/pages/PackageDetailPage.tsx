import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CircularProgress, Alert, Box } from '@mui/material';
import { getPackageDetails } from '../api/npmApi';

const PackageDetailPage: React.FC = () => {
  const { packageName } = useParams<{ packageName: string }>();
  const [packageDetail, setPackageDetail] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackageDetail = async () => {
      try {
        const data = await getPackageDetails(packageName || '');
        setPackageDetail(data);
      } catch (err) {
        setError('Failed to fetch package details');
      } finally {
        setLoading(false);
      }
    };

    fetchPackageDetail();
  }, [packageName]);

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

  if (!packageDetail) {
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
          <Typography variant="h4">{packageDetail.name}</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {packageDetail.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Latest Version: {packageDetail['dist-tags'].latest}
          </Typography>
          {/* Add more details based on the API response */}
        </CardContent>
      </Card>
    </Container>
  );
};

export default PackageDetailPage;
