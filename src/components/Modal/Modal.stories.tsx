import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';
import './HelperModal.css';

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
  args: {
    children: <div className='dialog'><p>Hello World!</p><p>This is a Modal!</p></div>,
    show: false,
    onClose: () => undefined
  },
  render: ({ show, onClose, children }) => {

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
        <button onClick={toggleModal}>Toggle Modal</button>
        <Modal show={localShow} onClose={handleClose}>
          {children}
        </Modal>
      </div>
    );
  },
};
