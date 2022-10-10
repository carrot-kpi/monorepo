import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Button } from './'

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = { variant: 'primary', size: 'standard', label: 'Primary button' }

export const Secondary = Template.bind({})
Secondary.args = { variant: 'secondary', size: 'standard', label: 'Secondary button' }
