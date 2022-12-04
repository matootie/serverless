import { ComponentStory, ComponentMeta } from "@storybook/react"

import { Card } from "#components/Card"

export default {
  title: "Booga/Card",
  component: Card,
} as ComponentMeta<typeof Card>

const Template: ComponentStory<typeof Card> = () => <Card />

export const Primary = Template.bind({})
