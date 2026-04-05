import React, { useState } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem,
  ListItemButton, ListItemIcon, ListItemText, Collapse, Grid, Paper,
  Stack, TextField, Select, MenuItem, Slider, InputAdornment, Box,
  CssBaseline, FormControl, InputLabel, Button
} from '@mui/material';
import {
  Menu as MenuIcon, Dashboard as DashboardIcon, Settings as SettingsIcon,
  Person as PersonIcon, AccountCircle as AccountCircleIcon,
  People as PeopleIcon, ShowChart as ShowChartIcon, Assessment as AssessmentIcon,
  AttachMoney as AttachMoneyIcon
} from '@mui/icons-material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const drawerWidth = 240;

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSettingsClick = () => {
    setSettingsOpen(!settingsOpen);
  };

  // Вміст бічної панелі (Drawer)
  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        
        {/* Вкладений список для налаштувань */}
        <ListItem disablePadding>
          <ListItemButton onClick={handleSettingsClick}>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Settings" />
            {settingsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon><AccountCircleIcon /></ListItemIcon>
              <ListItemText primary="Account" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* Верхня панель */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            UI Engineering Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Бічна панель навігації */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        {/* Для мобільних пристроїв */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        {/* Для великих екранів */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Головний контент */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        
        {/*Адаптивний макет */}
        <Typography variant="h4" gutterBottom>Metric Cards</Typography>
        <Grid container spacing={2} sx={{ mb: 5 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
              <Stack spacing={1} alignItems="center">
                <PeopleIcon color="primary" fontSize="large" />
                <Box>
                  <Typography variant="h6">1,024</Typography>
                  <Typography color="textSecondary">Total Users</Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
              <Stack spacing={1} alignItems="center">
                <ShowChartIcon color="secondary" fontSize="large" />
                <Box>
                  <Typography variant="h6">342</Typography>
                  <Typography color="textSecondary">Active Sessions</Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
              <Stack spacing={1} alignItems="center">
                <AssessmentIcon color="success" fontSize="large" />
                <Box>
                  <Typography variant="h6">85%</Typography>
                  <Typography color="textSecondary">Conversion Rate</Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
              <Stack spacing={1} alignItems="center">
                <AttachMoneyIcon color="warning" fontSize="large" />
                <Box>
                  <Typography variant="h6">$12,400</Typography>
                  <Typography color="textSecondary">Revenue</Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Форма */}
        <Typography variant="h4" gutterBottom>Asset Registration</Typography>
        <Paper elevation={4} sx={{ p: 4, maxWidth: 600 }}>
          <Stack spacing={3}>
            <TextField 
              label="Asset Name" 
              variant="outlined" 
              fullWidth 
            />
            <TextField 
              label="Asset Description" 
              variant="filled" 
              multiline 
              rows={3} 
              fullWidth 
            />
            <TextField
              label="Estimated Price"
              variant="outlined"
              type="number"
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }
              }}
              fullWidth
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel id="category-select-label">Category</InputLabel>
              <Select 
                labelId="category-select-label"
                label="Category" 
                defaultValue=""
              >
                <MenuItem value="hardware">Hardware</MenuItem>
                <MenuItem value="software">Software</MenuItem>
                <MenuItem value="furniture">Furniture</MenuItem>
              </Select>
            </FormControl>
            <Box>
              <Typography gutterBottom>Priority Level</Typography>
              <Slider
                defaultValue={5}
                step={1}
                marks
                min={1}
                max={10}
                valueLabelDisplay="auto"
              />
            </Box>
            <Button variant="contained" color="primary" size="large">
              Register Asset
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}