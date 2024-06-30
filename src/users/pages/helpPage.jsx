import React, { useState } from "react";
import Box from '@mui/material/Box';
import { List } from "@mui/material";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import HelpCenter from './HelpCenter';
import PrivacyAndSecurity from './PrivacySecurityPage';
import ReportProblem from './ReportProblem';

const HelpPage = () => {
    const [selectedItem, setSelectedItem] = useState('helpCenter'); 

    const handleListItemClick = (item) => {
        setSelectedItem(item);
    };

    return ( 
        <>  
                <span className="!text-center font-bold text-2xl mb-3">Need help?</span>
                <div className="flex flex-col md:flex-row gap-4 w-full mt-3">
                    <div className="w-1/2 flex flex-col gap-2 justify-center p-4 border-r-2 border-gray-500">
                        <List>
                            <ListItemButton onClick={() => handleListItemClick('helpCenter')} sx={{ bgcolor: selectedItem === 'helpCenter' ? '#d3d3d3' : '#dedede', '&:hover': { bgcolor: '#d3d3d3' }, color: 'black' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                    <ListItemText primary="Help center" />
                                    <ListItemIcon sx={{ minWidth: 'auto' }}>
                                        <ArrowRightIcon />
                                    </ListItemIcon>
                                </Box>
                            </ListItemButton>
                            <ListItemButton onClick={() => handleListItemClick('reportProblem')} sx={{ bgcolor: selectedItem === 'reportProblem' ? '#d3d3d3' : '#dedede', '&:hover': { bgcolor: '#d3d3d3' }, color: 'black' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                    <ListItemText primary="Report a problem" />
                                    <ListItemIcon sx={{ minWidth: 'auto' }}>
                                        <ArrowRightIcon />
                                    </ListItemIcon>
                                </Box>
                            </ListItemButton>
                            <ListItemButton onClick={() => handleListItemClick('privacySecurity')} sx={{ bgcolor: selectedItem === 'privacySecurity' ? '#d3d3d3' : '#dedede', '&:hover': { bgcolor: '#d3d3d3' }, color: 'black' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                    <ListItemText primary="Privacy and Security" />
                                    <ListItemIcon sx={{ minWidth: 'auto' }}>
                                        <ArrowRightIcon />
                                    </ListItemIcon>
                                </Box>
                            </ListItemButton>
                        </List>
                    </div>

                    <div className="w-1/2 p-4">
                        {selectedItem === 'reportProblem' && <ReportProblem/>}
                        {selectedItem === 'helpCenter' && <HelpCenter/>}
                        {selectedItem === 'privacySecurity' && <PrivacyAndSecurity/>}
                    </div>
                </div>
        </>
    );
}

export default HelpPage;
