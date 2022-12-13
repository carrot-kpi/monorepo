import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Button } from '.'

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

const commonArgTypes = {
  variant: { control: 'select', options: ['primary', 'secondary'] },
  size: { control: 'select', options: ['big', 'small', 'xsmall'] },
}

export const Primary = Template.bind({})
Primary.args = { children: 'Primary default' }
Primary.argTypes = commonArgTypes

export const PrimarySmall = Template.bind({})
PrimarySmall.args = { variant: 'primary', children: 'Primary Small', size: 'small' }
PrimarySmall.argTypes = commonArgTypes

export const PrimaryXsmall = Template.bind({})
PrimaryXsmall.args = { variant: 'primary', children: 'Primary xsmall', size: 'xsmall' }
PrimaryXsmall.argTypes = commonArgTypes

export const PrimaryDisabled = Template.bind({})
PrimaryDisabled.args = {
  variant: 'primary',
  children: 'Primary xsmall',
  size: 'xsmall',
  disabled: true,
}
PrimaryDisabled.argTypes = commonArgTypes

export const PrimaryWithHrefLink = Template.bind({})
PrimaryWithHrefLink.args = {
  variant: 'primary',
  children: 'Primary xsmall',
  size: 'xsmall',
  href: 'https://youtu.be/pA96m95T3NA',
}
PrimaryWithHrefLink.argTypes = commonArgTypes

// secondary button

export const Secondary = Template.bind({})
Secondary.args = { variant: 'secondary', size: 'big', children: 'Secondary button' }
Secondary.argTypes = commonArgTypes
