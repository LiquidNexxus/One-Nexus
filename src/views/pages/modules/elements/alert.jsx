import * as app from '../../../../app';

function DEMO__HIDE_ALERT(alert) {
    document.getElementById('alert-demo').classList.add('hidden');
}

const AlertBars = () => {
    return (
        <app.layouts.Base {...app.config.app.views}>

            <Heading heading='2' size='7'>Alert</Heading>

            <Heading heading='3' size='5'>Quick Look</Heading>

            <app.SyntaxHighlighter language='jsx'>{
                '<Alert>This is a default alert</Alert>'
            }</app.SyntaxHighlighter>

            <Well>
                <Alert>This is a default alert</Alert>
            </Well>

            <List>
                <List.Item><app.Link to='#configuration'>Configuration</app.Link></List.Item>
                <List.Item><app.Link to='#styles'>Styles</app.Link></List.Item>
                <List.Item><app.Link to='#interactions'>Interactions</app.Link></List.Item>
                <List.Item><app.Link to='#render-with-react'>Render With React</app.Link></List.Item>
            </List>

            <app.Section id='configuration'>
                <Heading heading='3' size='5'>Configuration</Heading>

                <Alert alert="help"><a href="#">Learn more</a> about module configutation</Alert>

                <app.SyntaxHighlighter language='json'>{`
                    "alert": {
                        "name": "alert",
                        "alerts": {
                            "error": {
                                "color": ["#COLOR", "alert", "error"],
                                "icon": "times"
                            },
                            "success": {
                                "color": ["#COLOR", "alert", "success"],
                                "icon": "check"
                            },
                            "info": {
                                "color": ["#COLOR", "alert", "info"],
                                "icon": "info-circle"
                            },
                            "help": {
                                "color": ["#COLOR", "alert", "help"],
                                "icon": "question-circle"
                            }
                        },
                        "text-color": ["#COLOR", "greyscale", "white"],
                        "icon": {
                            "default-enable": true,
                            "margin-right": "0.5em",
                            "line-height": "1.25",
                            "-right": {
                                "margin-left": "0.5em"
                            }
                        },
                        "-bar": {
                            "padding": "0.85em"
                        },
                        "-box": {
                            "padding": "1.5em"
                        }
                    }
                `}</app.SyntaxHighlighter>

                <Heading heading='5' size='4'>alert.alerts</Heading>

                <List>
                    <List.Item><b>color: </b> The background color of the alert</List.Item>
                    <List.Item><b>icon:</b> <a href="https://fontawesome.com/v4.7.0/icons/" target="blank">FontAwesome</a> keyword for the alert's icon</List.Item>
                </List>

                <Heading heading='5' size='4'>alert.icon['default-enable']</Heading>

                <Well>
                    <Paragraph>Set to show the alert's icon by default</Paragraph>
                </Well>

            </app.Section>

            <app.Section id='styles'>
                <Heading heading='3' size='5'>Styles</Heading>

                <Alert alert="info">Edit styles in <a href="#">ui/modules/elements/alert/_alert.scss</a></Alert>

                <Alert alert="help"><a href="#">Learn how to modify styles using the above configuration</a> so you don't have to touch the source code</Alert>
            </app.Section>

            <app.Section id='interactions'>
                <Heading heading='3' size='5'>Interactions</Heading>

                <Alert alert="info">Interactions are defined in <a href="#">ui/modules/elements/alert/alert.js</a></Alert>

                <Heading heading='4' size='4'>Dismiss</Heading>

                <Well>
                    <Paragraph>Hide an Alert</Paragraph>
                </Well>

                <app.SyntaxHighlighter language='html'>{`
                    <div class="alert-bar" id="alert-demo">...</div>
                `}</app.SyntaxHighlighter>

                <app.SyntaxHighlighter language='js'>{`
                    const alert = document.getElementById('alert-demo');

                    window.UI.alert().dismiss(alert);
                `}</app.SyntaxHighlighter>
            </app.Section>

            <app.Section id='render-with-react'>
                <Heading heading='3' size='5'>Render With React</Heading>

                <app.SyntaxHighlighter language='jsx'>{
                    '<Alert>This is an alert</Alert>'
                }</app.SyntaxHighlighter>

                <List>
                    <List.Item><app.Link to='#props.bar'>[...Global.props]</app.Link></List.Item>
                    <List.Item><app.Link to='#props.bar'>Props.bar</app.Link></List.Item>
                    <List.Item><app.Link to='#props.box'>Props.box</app.Link></List.Item>
                    <List.Item><app.Link to='#props.alert'>Props.alert</app.Link></List.Item>
                    <List.Item><app.Link to='#props.icon'>Props.icon</app.Link></List.Item>
                    <List.Item><app.Link to='#props.close'>Props.close</app.Link></List.Item>
                </List>

                <app.Section id='props.bar'>
                    <Heading size='5'>Props.bar</Heading>

                    {/* <app.Table small content={[{
                        default: 'true',
                        type: 'Bool'
                    }]} /> */}

                    <app.SyntaxHighlighter language='jsx'>{
                        '<Alert bar>This is an alert</Alert>'
                    }</app.SyntaxHighlighter>

                    <Heading heading='4' size='3'>Output:</Heading>

                    <app.SyntaxHighlighter language='html'>{
                        '<div class="alert-bar">This is an alert</div>'
                    }</app.SyntaxHighlighter>

                    <Heading heading='4' size='3'>Preview:</Heading>

                    <Well>
                        <Alert bar>This is an alert</Alert>
                    </Well>
                </app.Section>

                <app.Section id='props.box'>
                    <Heading size='5'>Props.box</Heading>

                    {/* <app.Table small content={[{
                        default: 'false',
                        type: 'Bool'
                    }]} /> */}

                    <app.SyntaxHighlighter language='jsx'>{
                        '<Alert box>This is an alert</Alert>'
                    }</app.SyntaxHighlighter>

                    <Heading heading='4' size='3'>Output:</Heading>

                    <app.SyntaxHighlighter language='html'>{
                        '<div class="alert-box">This is an alert</div>'
                    }</app.SyntaxHighlighter>

                    <Heading heading='4' size='3'>Preview:</Heading>

                    <Well>
                        <Alert box>This is an alert</Alert>
                    </Well>
                </app.Section>

                <app.Section id='props.alert'>
                    <Heading size='5'>Props.alert</Heading>

                    {/* <app.Table small content={[{
                        default: 'success',
                        type: 'String'
                    }]} /> */}

                    <app.SyntaxHighlighter language='jsx'>{
                        `<Alert alert='success'>This is an alert</Alert>`
                    }</app.SyntaxHighlighter>

                    <Heading heading='4' size='3'>Output:</Heading>

                    <app.SyntaxHighlighter language='html'>{
                        '<div class="alert-bar-success">This is an alert</div>'
                    }</app.SyntaxHighlighter>

                    <p>You can directly reference available alerts as a prop name:</p>

                    <app.SyntaxHighlighter language='jsx'>{`
                        <Alert success>This is an alert</Alert>
                    `}</app.SyntaxHighlighter>
                </app.Section>

                <app.Section id='props.icon'>
                    <Heading size='5'>Props.icon</Heading>

                    {/* <app.Table small content={[{
                        default: 'undefined',
                        type: '(String|Array)'
                    }]} /> */}

                    <List>
                        <List.Item>
                            <app.Link to='#overwrite-default-icon'>Overwrite default icon</app.Link>
                        </List.Item>
                        <List.Item>
                            <app.Link to='#disable-default-icon'>Disable default icon</app.Link>
                        </List.Item>
                        <List.Item>
                            <app.Link to='#right-aligned-icon'>Right-aligned icon</app.Link>
                        </List.Item>
                        <List.Item>
                            <app.Link to='#right-aligned-custom-icon'>Right-aligned custom icon</app.Link>
                        </List.Item>
                    </List>

                    <app.Section id='overwrite-default-icon'>
                        <Heading size='4'>Overwrite default icon</Heading>

                        <app.SyntaxHighlighter language='jsx'>{
                            `<Alert icon='exclamation-triangle'>This is an alert</Alert>`
                        }</app.SyntaxHighlighter>

                        <Heading heading='4' size='3'>Output:</Heading>

                        <app.SyntaxHighlighter language='html'>{`
                            <div class="alert-bar">
                                <div class="alert_icon fa fa-exclamation-triangle"></div> This is an alert
                            </div>
                        `}</app.SyntaxHighlighter>

                        <Heading heading='4' size='3'>Preview:</Heading>

                        <Well>
                            <Alert icon='exclamation-triangle'>This is an alert</Alert>
                        </Well>
                    </app.Section>

                    <app.Section id='disable-default-icon'>
                        <Heading size='4'>Disable default icon</Heading>

                        <app.SyntaxHighlighter language='jsx'>{
                            `<Alert icon={false}>This is an alert</Alert>`
                        }</app.SyntaxHighlighter>

                        <Heading heading='4' size='3'>Output:</Heading>

                        <app.SyntaxHighlighter language='html'>{`
                            <div class="alert-bar">This is an alert</div>
                        `}</app.SyntaxHighlighter>

                        <Heading heading='4' size='3'>Preview:</Heading>

                        <Well>
                            <Alert icon={false}>This is an alert</Alert>
                        </Well>
                    </app.Section>

                    <app.Section id='right-aligned-icon'>
                        <Heading size='4'>Right-aligned icon:</Heading>

                        <Alert info>A right-aligned icon cannot be used in conjunction with the <code className='code'>close</code> prop</Alert>

                        <app.SyntaxHighlighter language='jsx'>{
                            `<Alert icon='right'>This is an alert</Alert>`
                        }</app.SyntaxHighlighter>

                        <app.SyntaxHighlighter language='html'>{`
                            <div class="alert-bar">
                                <div class="alert_icon-right fa fa-check"></div> This is an alert
                            </div>
                        `}</app.SyntaxHighlighter>

                        <Well>
                            <Alert icon='right'>This is an alert</Alert>
                        </Well>
                    </app.Section>

                    <app.Section id='right-aligned-custom-icon'>
                        <Heading size='4'>Right-aligned custom icon:</Heading>

                        <app.SyntaxHighlighter language='jsx'>{
                            `<Alert icon={['exclamation-triangle', 'right']}>This is an alert</Alert>`
                        }</app.SyntaxHighlighter>

                        <app.SyntaxHighlighter language='html'>{`
                            <div class="alert-bar">
                                <div class="alert_icon-right fa fa-exclamation-triangle"></div> This is an alert
                            </div>
                        `}</app.SyntaxHighlighter>

                        <Well>
                            <Alert icon={['exclamation-triangle', 'right']}>This is an alert</Alert>
                        </Well>
                    </app.Section>
                </app.Section>

                <app.Section id='props.close'>
                    <Heading size='5'>Props.close</Heading>

                    <Alert info>This prop cannot be used in conjunction with a right-aligned icon</Alert>

                    <app.SyntaxHighlighter language='jsx'>{
                        `<Alert close>This is an alert</Alert>`
                    }</app.SyntaxHighlighter>

                    <app.SyntaxHighlighter language='html'>{`
                        <div class="alert-bar">
                            <div class="alert_icon-close-right fa fa-times"></div> This is an alert
                        </div>
                    `}</app.SyntaxHighlighter>

                    <Alert info>Clicking the close icon triggers the <code className='code'>dismiss</code> <app.Link to='#interactions'>interaction</app.Link> by default</Alert>

                    <Well>
                        <Alert close>This is an alert</Alert>
                    </Well>

                    <Heading heading='4' size='4'>Custom callback function onClick:</Heading>

                    <app.SyntaxHighlighter language='js'>{`
                        function hideAlert() {
                            document.getElementById('alert-demo').classList.add('hidden');
                        }
                    `}</app.SyntaxHighlighter>

                    <app.SyntaxHighlighter language='jsx'>{`
                        <Alert id='alert-demo' close={hideAlert}>...</Alert>
                    `}</app.SyntaxHighlighter>

                    <Well>
                        <Alert id='alert-demo' close={DEMO__HIDE_ALERT}>
                            Click the X icon to initiate the callback function
                        </Alert>
                    </Well>
                </app.Section>
            </app.Section>

        </app.layouts.Base>
    );
}

export default AlertBars;