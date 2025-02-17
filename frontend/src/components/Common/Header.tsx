import {
  AppBar,
  Box,
  Button,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material'
import { memo } from 'react'
// import styled from '@emotion/styled'
// import { css } from '@emotion/react'

const MENU_ITEMS = ['Career', 'Skill', 'Profile', 'Contact']
const Header = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#000' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        {MENU_ITEMS.map((item) => (
          <ListItem component="div" disablePadding>
            <ListItemButton>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </Toolbar>
    </AppBar>
    // <div>
    //   {MENU_ITEMS.map((item) => (
    //     <ListItem component="div" disablePadding>
    //       <ListItemButton>
    //         <ListItemText primary={item} />
    //       </ListItemButton>
    //     </ListItem>
    //   ))}
    // </div>
  )
}

// const Container = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 16px;
//   background-color: #f0f0f0;
// `
// const Container = styled(Box)`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 16px;
//   background-color: #f0f0f0;
// `

export default memo(Header)
