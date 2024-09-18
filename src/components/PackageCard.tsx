import React from 'react';
import { Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

interface PackageCardProps {
  name: string;
  description: string;
  latestVersion: string;
}

const PackageCard: React.FC<PackageCardProps> = ({ name, description, latestVersion }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {description}
        </Typography>
        <Typography variant="caption">
          Latest version: {latestVersion}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={`/packages/${name}`} variant="contained" color="primary">
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default PackageCard;
