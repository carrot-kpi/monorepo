import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { TextMono } from '.'

const sizes: ['2xl', 'xl', 'lg', 'md', 'sm', 'xs', '2xs'] = [
  '2xl',
  'xl',
  'lg',
  'md',
  'sm',
  'xs',
  '2xs',
]

export default {
  title: 'TextMono',
  component: TextMono,
} as ComponentMeta<typeof TextMono>

export const AllSizes = () => {
  return (
    <div className="space-y-4">
      {sizes.map((size) => (
        <TextMono key={size} size={size} color="black">
          Featured campaigns
        </TextMono>
      ))}
    </div>
  )
}

const Template: ComponentStory<typeof TextMono> = (args) => <TextMono {...args} />

const commonArgTypes = {
  weight: { control: 'select', options: ['medium', 'normal'] },
  caps: { control: 'boolean' },
  color: { control: 'select', options: ['black', 'white'] },
  size: { control: 'select', options: sizes },
}

export const TextMonoDefault = Template.bind({})
TextMonoDefault.args = { children: 'Featured Campaigns' }
TextMonoDefault.argTypes = commonArgTypes
