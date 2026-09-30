import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: function ModalStory() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)} style={{ color: '#f0f0f3', background: '#818cf8', border: 'none', padding: '8px 16px', borderRadius: 8, cursor: 'pointer' }}>
          Open Modal
        </button>
        <Modal open={open} onClose={() => setOpen(false)} aria-label="Example dialog">
          <h2 style={{ margin: '0 0 12px' }}>Confirm Trade</h2>
          <p style={{ margin: '0 0 16px', color: '#a0a3b1' }}>
            Are you sure you want to execute this order?
          </p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button onClick={() => setOpen(false)} style={{ color: '#a0a3b1', background: 'transparent', border: '1px solid #2e3240', padding: '6px 14px', borderRadius: 8, cursor: 'pointer' }}>
              Cancel
            </button>
            <button onClick={() => setOpen(false)} style={{ color: '#f0f0f3', background: '#818cf8', border: 'none', padding: '6px 14px', borderRadius: 8, cursor: 'pointer' }}>
              Confirm
            </button>
          </div>
        </Modal>
      </>
    );
  },
};
