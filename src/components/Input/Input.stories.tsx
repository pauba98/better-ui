import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';
import React from 'react';
const inputTypes = Object.freeze([
  'button', 'checkbox', 'color', 'date', 'datetime-local', 'email',
  'file', 'hidden', 'image', 'month', 'number', 'password', 'radio',
  'range', 'reset', 'search', 'submit', 'tel', 'text', 'time', 'url', 'week',
] as const);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export

/**
 * ## DESCRIPTION
 * The Input component extends a native input element but adds error validation. It is fully customizable, as it allows any
 * React Input Props (React.InputHTMLAttributes<HTMLInputElement>)
 * 
 */

const meta = {
  title: 'BetterUI/Input',
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    type: {
      control: { type: 'select' },
      options: inputTypes,
      description: 'Sets the type of the input element.',
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    type: 'text',
    placeholder: 'Enter something...',
    disabled: false,
    error: false,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Primary: Story = {
  args: {  },
};


export const PasswordInput: Story = {
  args: { placeholder: 'Introduce la contraseña', type: 'password' },
};

export const NumberInput: Story = {
  args: { placeholder: 'Introduce el usuario', type: 'number' },
};


/**
 * - **Controlled Input**: The value of the input is managed by React state. Changes to the input value are handled through an `onChange` event, allowing for immediate updates and validation.
 */

export const ControlledValue: Story = {
  parameters: {
    docs: {
      source: {
        language: 'tsx',
        code: `
import { useState, type ChangeEvent } from 'react';
import Input from './Input';
      
const ControlledInput = () => {
  const [value, setValue] = useState('Controlled Value');

  const handleChange = (e: ChangeEvent<HTMLInputElement>, value) => {
    setValue(value);
    console.log(value);
  }
  
  return (
    <Input
      id='controlled-input'
      label='Controlled Input'
      value={value}
      onChange={handleChange}
    />
  );
}
`
      }
    }
  },
  render: () => (
    <div className='flex items-center gap-4'>
      <Input id='input1' />
    </div>
  )
};

/**
 * - **Uncontrolled Input**: The input value is not managed by React state. Instead, it uses a `defaultValue` prop to set the initial value, and changes are logged through an `onChange` event.
 */

export const UncontrolledValue: Story = {
  parameters: {
    docs: {
      source: {
        language: 'tsx',
        code: `
import { useState, type ChangeEvent } from 'react';
import Input from './Input';
      
const UncontrolledInput = () => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>, value: string) => {
    console.log(value);
  };

  return (
    <Input
      id='controlled-input'
      label='Controlled Input'
      defaultValue={'Uncontrolled Value'}
      onChange={handleChange}
    />
  );
}
`
      }
    }
  },
  render: () => (
    <div className='flex items-center gap-4'>
      <Input id='input2' />
    </div>
  )
};
