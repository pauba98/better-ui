import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';
import './HelperModal.css';
import Button from '../Button';

const meta = {
  title: 'BetterUI/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Define args for controlling show/hide
    show: { control: 'boolean' },
    onClose: { action: 'onClose' },  // Log the action of toggling the modal
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary Modal Story
export const Primary: Story = {
  parameters: {
    docs: {
      source: {
        language: 'tsx',
        code: `
import React from 'react';
import Modal from './Modal';
      
  const ModalComponent = () => {

    const [show, setShow] = useState(show);

    const toggleModal = () => {
      setShow(true);
    };

    
    const handleClose = (e: React.MouseEvent) => {
      onClose(e);
      setShow(false);
    }

    return (
      <div>
        <Button onClick={toggleModal}>Toggle Modal</Button>
        <Modal show={show} onClose={handleClose}>
          <div className='dialog' style={{ textAlign: 'center' }}>
            <p>Hello World!</p>
            <p style={{ marginBottom: '24px' }}>This is a Modal!</p>
            <Button onClick={() => setShow(false)} variant='secondary'>Close Modal</Button>
          </div>
        </Modal>
      </div>
          );
        }
        `
      }
    }
  },
  args: {
    children: <></>,
    show: false,
    onClose: () => undefined,
    position: undefined,
  },
  render: ({ show, onClose, children, position }) => {

    const [localShow, setLocalShow] = useState(show);

    useEffect(() => {
      setLocalShow(show)
    }, [show])

    const toggleModal = () => {
      setLocalShow(true);
    };

    const handleClose = (e: React.MouseEvent) => {
      onClose(e);
      setLocalShow(false);
    }

    return (
      <div>
        <Button onClick={toggleModal}>Toggle Modal</Button>
        <Modal show={localShow} onClose={handleClose} position={position}>
          {children}
          <div className='dialog' style={{ textAlign: 'center' }}>
            <p>Hello World!</p>
            <p style={{ marginBottom: '24px' }}>This is a Modal!</p>
            <Button onClick={() => setLocalShow(false)} variant='secondary'>Close Modal</Button>
          </div>
        </Modal>
      </div>
    );
  },
};


/**
 * - The Modal component allow to open a Modal inside of other modals.
 */
export const TwoModals: Story = {
  parameters: {
    docs: {
      source: {
        language: 'tsx',
        code: `
import React from 'react';
import Modal from './Modal';
      
  const ModalComponent = () => {

    const [showFirst, setShowFirst] = useState(false);
    const [showSecond, setShowSecond] = useState(false);

    return (
      <div>
        <Button onClick={() => setShowFirst(true)}>Open First Modal</Button>
        <Modal show={showFirst} onClose={() => setShowFirst(false)}>
          <div className='dialog' style={{ textAlign: 'center' }}>
            <p>Hello World!</p>
            <p style={{ marginBottom: '24px' }}>This is a Modal!</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
              <Button onClick={() => setShowFirst(false)} variant='secondary'>Close Modal</Button>
              <Button onClick={() => setShowSecond(true)}>Open SecondModal</Button>
            </div>
          </div>
          <Modal show={showSecond} onClose={() => setShowSecond(false)}>
            <div className='dialog'>
              <p>SecondModal</p>
            </div>
          </Modal>
        </Modal>
      </div>
    );
  }
        `
      }
    }
  },
  args: {
    children: <></>,
    show: false,
    onClose: () => undefined
  },
  render: () => {

    const [showFirst, setShowFirst] = useState(false);
    const [showSecond, setShowSecond] = useState(false);

    return (
      <div>
        <Button onClick={() => setShowFirst(true)}>Open First Modal</Button>
        <Modal show={showFirst} onClose={() => setShowFirst(false)}>
          <div className='dialog' style={{ textAlign: 'center' }}>
            <p>Hello World!</p>
            <p style={{ marginBottom: '24px' }}>This is a Modal!</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
              <Button onClick={() => setShowFirst(false)} variant='secondary'>Close Modal</Button>
              <Button onClick={() => setShowSecond(true)}>Open SecondModal</Button>
            </div>
          </div>
          <Modal show={showSecond} onClose={() => setShowSecond(false)}>
            <div className='dialog'>
              <p>SecondModal</p>
            </div>
          </Modal>
        </Modal>
      </div>
    );
  },
};



/**
 * - You can choose the vertical position of the modal using the `position` prop.
 * - The `position` prop accepts three values: `top`, `center`, and `bottom`.
 */

export const Positions: Story = {
  args: {
    onClose: () => {/* */ },
    show: false,
    children: null
  },
  render: () => {

    const [showCenterPos, setShowCenterPos] = useState(false);
    const [showTopPos, setShowTopPos] = useState(false);
    const [showBottomPos, setShowBottomPos] = useState(false);

    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
        <Button variant='tertiary' onClick={() => setShowTopPos(true)}>Top Position</Button>
        <Modal show={showTopPos} onClose={() => setShowTopPos(false)} position='top'>
          <div className='dialog'>
            <p>Modal centered top</p>
          </div>
        </Modal>
        <Button variant='tertiary' onClick={() => setShowCenterPos(true)}>Center Position</Button>
        <Modal show={showCenterPos} onClose={() => setShowCenterPos(false)} position='center'>
          <div className='dialog'>
            <p>Modal centered vertically</p>
          </div>
        </Modal>
        <Button variant='tertiary' onClick={() => setShowBottomPos(true)}>Bottom Position</Button>
        <Modal show={showBottomPos} onClose={() => setShowBottomPos(false)} position='bottom'>
          <div className='dialog'>
            <p>Modal centered bottom</p>
          </div>
        </Modal>
      </div >
    )
  }
};

/**
 * - You can customize the backdrop of the modal using the `classesBackdrop` prop.
 * - The `classesBackdrop` prop accepts a string with a CSS class to style the backdrop.
 */
export const CustomBackdrop: Story = {
  args: {
    onClose: () => {/* */ },
    show: false,
    children: null,
  },
  render: () => {

    const [show, setShow] = useState(false);

    return (
      <div>
        <Button variant='primary' onClick={() => setShow(true)}>Open Modal</Button>
        <Modal show={show} onClose={() => setShow(false)} classesBackdrop='customBackdrop'>
          <div className='dialog'>
            <p>Modal with cool backdrop</p>
          </div>
        </Modal>
      </div >
    )
  }
}