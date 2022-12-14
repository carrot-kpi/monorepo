import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Text } from '.'

export default {
  title: 'Text Component',
  component: Text,
} as ComponentMeta<typeof Text>

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />

const sizes: ['sm', 'xs'] = ['sm', 'xs']

export const AllText = () => (
  <div className="space-y-4">
    {sizes.map((size) => (
      <Text key={size} size={size} color="black">
        Featured campaigns
      </Text>
    ))}
  </div>
)

const commonArgTypes = {
  color: { control: 'select', options: ['black', 'white'] },
  size: { control: 'select', options: sizes },
}

export const TextDefault = Template.bind({})
TextDefault.args = { children: 'Featured Campaigns' }
TextDefault.argTypes = commonArgTypes
