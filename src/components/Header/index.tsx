import {Toolbar, Grid} from '@material-ui/core';
import LoginButton from './LoginButton';
import ThemeButton from './ThemeButton';
import {AppBarS} from '../../style/components/Header';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from "@material-ui/core/Slide";
import Search from './Search';

function HideOnScroll({children, trigger}: {children: React.ReactElement, trigger: any}) {
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Header() {
  const trigger = useScrollTrigger();
  
  return (<>
    <HideOnScroll trigger={trigger}>
      <AppBarS>
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Search className="desktop" />
            <div>
              <ThemeButton />
              <LoginButton />
            </div>
          </Grid>
        </Toolbar>
      </AppBarS>
    </HideOnScroll>
    <Toolbar />
  </>);
}

export default Header;
