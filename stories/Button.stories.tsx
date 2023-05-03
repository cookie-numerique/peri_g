import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Button} from "../components/buttons/Button";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {control: "color"},
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.storyName = 'Valider';
Primary.args = {
  label: "Valider",
  color: 'success'
};

// export const Secondary = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
// Secondary.storyName = 'Annuler'; 
// Secondary.args = {
//   label: "Annuler",
//   color: 'error'
// };

// export const Secondary = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
// Secondary.storyName = 'Annuler'; 
// Secondary.args = {
//   label: "Annuler",
//   color: 'error'
// };
