import * as app from '../../app';

/**
 * Render Base layout
 */
const Base = props => (
    <main>
        <Header {...props.header}>
            <Logo {...props.logo} />
            <Navigation {...props.navigation} />

            <div className='sideNav_toggle button-icon-primary max-break-3'>
                <i className='fa fa-bars'></i>
            </div>
        </Header>

        <div className='container'>
            <div>
                <app.Link to='/'>Home</app.Link>
                <app.Link to='/accordion'>Accordion</app.Link>
                <app.Link to='/alert'>Alert</app.Link>
                <app.Link to='/blockquote'>Blockquote</app.Link>
                <app.Link to='/button'>Button</app.Link>
                <app.Link to='/carousel'>Carousel</app.Link>
                <app.Link to='/form'>Form</app.Link>
                <app.Link to='/heading'>Heading</app.Link>
                <app.Link to='/image'>Image</app.Link>
                <app.Link to='/list'>List</app.Link>
                <app.Link to='/modal'>Modal</app.Link>
                <app.Link to='/paragraph'>Paragraph</app.Link>
                <app.Link to='/progress-bar'>Progress Bar</app.Link>
                <app.Link to='/table'>Table</app.Link>
                <app.Link to='/tabs'>Tabs</app.Link>
                <app.Link to='/tooltip'>Tooltip</app.Link>
                <app.Link to='/well'>Well</app.Link>
            </div>

            {props.children}
        </div>

        <Footer>
            <a href='#'>Link 1</a>
        </Footer>

        <Overlay id='overlay' />

        <Preloader />

        <Search />

        <SideNav navigation={[
            ["link 1", "/"],
            ["link 2", "/", [
                ["link 2 child", "/"],
                ["link 2 child 2", "/"],
                ["link 2 child 3", "/", [
                    ["link 2 grandchild", "/"],
                    ["link 2 grandchild 2", "/"]
                ]]
            ]],
            ["link 3", "/"]
        ]} />
    </main>
);

export default Base