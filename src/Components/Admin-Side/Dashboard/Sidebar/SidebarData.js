import React from 'react'
import AddIcon from '@material-ui/icons/Add';
import AssessmentIcon from '@material-ui/icons/Assessment';
import CreateIcon from '@material-ui/icons/Create';
import VisibilityIcon from '@material-ui/icons/Visibility';

export const SidebarData = [
    {
        title: 'Add Questions',
        icon: <AddIcon/>,
        link: '/home'
    },
    {
        title: 'Create Exam',
        icon: <CreateIcon/>,
        link: '/create-exam'
    },
    {
        title: 'View Exam',
        icon: < VisibilityIcon/>,
        link: '/view-exam'
    },
    {
        title: 'Score',
        icon: < AssessmentIcon/>,
        link: '/results'
    }

]
