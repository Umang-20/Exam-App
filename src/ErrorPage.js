import React from 'react'
import {Modal, Button} from 'react-bootstrap'
import './ErrorPage.css'


function ErrorPage() {
    return (
        <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>Invalid URL</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>A URL in your data feed is badly formed or contains invalid characters. There are several common
                    reasons why you might receive this error:</p>
                <a href='https://support.google.com/merchants/answer/160038?hl=en'>know more?</a>
            </Modal.Body>

            <Modal.Footer id='sidebarpropsfooter'>
                <h3>Was this helpful?</h3>
                <Button id='sidebarpropsbutton'>No</Button>
                <Button id='sidebarpropsbutton'>Yes</Button>
            </Modal.Footer>
        </Modal.Dialog>
    )
}

export default ErrorPage
