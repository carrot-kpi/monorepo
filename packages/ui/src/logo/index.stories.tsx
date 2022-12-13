import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Logo } from '.'

export default {
  title: 'Logo',
  component: Logo,
} as ComponentMeta<typeof Logo>

const Template: ComponentStory<typeof Logo> = () => <Logo />

export const Default = Template.bind({})
