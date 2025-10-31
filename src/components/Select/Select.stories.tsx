import type { Meta, StoryObj } from '@storybook/react';
import Select from './Select';
import top100Films from '../../constants/constants';
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export


/**
 * ## DESCRIPTION
 * The Select component is a versatile element that allows users to select between different options.
 * It supports various configurations, including custom triggers, widths, offsets, alignments, and positions.
 * The component is designed to be accessible and customizable, making it suitable for a wide range of use cases.
 *
 * ## DEPENDENCIES
 * - [Radix UI Dropdown Menu](https://www.radix-ui.com/docs/primitives/components/dropdown-menu)
 * - [React Spinners](https://github.com/davidhu2000/react-spinners)
 * - Icon - from Lucide React for icons
 *
 * ## ITEMS STRUCTURE
 * The `items` prop defines the structure of the dropdown menu. It is an array of objects, where each object represents a menu element.
 * The following types of elements are supported:
 *
 * ## POSSIBILITIES
 * - **Customizable Content**: Add icons, shortcuts, or any React node to `startContent` and `endContent`.
 * - **Nested Menus**: Use `submenu` to create hierarchical menus.
 * - **Variants**: Style items as `default` or `destructive` for different use cases.
 * - **Disabled Items**: Disable specific items to indicate unavailable actions.
 * - **Dividers and Labels**: Use `separator` and `label` to organize and group items.
 *
 * ## USAGE
 *
 * ### 1. Label
 * A non-interactive label used to group or describe menu items.
 * ```json
 * {
 *   "type": "label",
 *   "label": "My Account"
 * }
 * ```
 *
 * ### 2. Separator
 * A visual divider used to separate groups of menu items.
 * ```json
 * {
 *   "type": "separator"
 * }
 * ```
 *
 * ### 3. Item
 * A clickable menu item that can trigger an action or navigate to a link.
 * ```json
 * {
 *   "type": "item",
 *   "label": "Profile",
 *   "disabled": false,
 *   "variant": "default",
 *   "onClick": () => alert('Profile clicked'),
 *   "startContent": <Icon name="user" />,
 *   "endContent": <span>⇧⌘P</span>
 * }
 * ```
 * - **Properties**:
 *   - `label`: The text displayed for the menu item.
 *   - `disabled`: Whether the item is disabled.
 *   - `variant`: The visual style of the item (`default` or `destructive`).
 *   - `onClick`: A callback function triggered when the item is clicked.
 *   - `startContent`: Optional content (e.g., an icon) displayed at the start of the item.
 *   - `endContent`: Optional content (e.g., a shortcut) displayed at the end of the item.
 *
 * ### 4. Submenu
 * A nested menu that contains additional items.
 * This allows for organizing related actions under a single menu trigger.
 * You can use `startContent` and `endContent` to customize the submenu trigger.
 * ChevronRight icon is rendered by default but you can be overridden with custom icons if needed.
 * ```json
 * {
 *   "type": "submenu",
 *   "label": "Team",
 *   "startContent": <Icon name="users" />,
 *   "endContent": <ChevronRightIcon className="ml-auto size-4" />,
 *   "items": [
 *     { "type": "item", "label": "Invite users" },
 *     { "type": "item", "label": "New Team", "endContent": <span>⌘+T</span> }
 *   ]
 * }
 * ```
 * - **Properties**:
 *   - `label`: The text displayed for the submenu trigger.
 *   - `items`: An array of `DropdownElement` objects defining the submenu's structure.
 *
 * ## EXAMPLE
 * Here is an example of a complete `items` array:
 * ```json
 * [
 *   { "type": "label", "label": "My Account" },
 *   { "type": "separator" },
 *   {
 *     "type": "item",
 *     "label": "Profile",
 *     "onClick": () => alert('Profile clicked'),
 *     "startContent": <Icon name="user" />,
 *     "endContent": <span>⇧⌘P</span>
 *   },
 *   { "type": "item", "label": "Billing", "endContent": <span>⌘B</span> },
 *   { "type": "separator" },
 *   {
 *     "type": "submenu",
 *     "label": "Team",
 *     "items": [
 *       { "type": "item", "label": "Invite users" },
 *       { "type": "item", "label": "New Team", "endContent": <span>⌘+T</span> }
 *     ]
 *   },
 *   { "type": "separator" },
 *   { "type": "item", "label": "Log out", "variant": "destructive", "endContent": <span>⇧⌘Q</span> }
 * ]
 * ```
 *
 */

const meta = {
  title: 'BetterUI/Select',
  component: Select,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { options: [] },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;


// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    options: top100Films.slice(0, 20),
  },
};

