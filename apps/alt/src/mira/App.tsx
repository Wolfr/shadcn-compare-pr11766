import { useEffect, useLayoutEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import {
  AlertCircleIcon,
  BellIcon,
  BoldIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CreditCardIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  ItalicIcon,
  MailIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  StarIcon,
  UnderlineIcon,
  UserIcon,
} from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label as RechartsLabel,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  XAxis,
} from "recharts"
import { toast } from "sonner"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/mira/components/ui/accordion"
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/mira/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/mira/components/ui/alert-dialog"
import { AspectRatio } from "@/mira/components/ui/aspect-ratio"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/mira/components/ui/avatar"
import { Badge } from "@/mira/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/mira/components/ui/breadcrumb"
import { Button } from "@/mira/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/mira/components/ui/button-group"
import { Calendar } from "@/mira/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/mira/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/mira/components/ui/carousel"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/mira/components/ui/chart"
import { Checkbox } from "@/mira/components/ui/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/mira/components/ui/collapsible"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/mira/components/ui/combobox"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/mira/components/ui/command"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/mira/components/ui/context-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/mira/components/ui/dialog"
import { DirectionProvider } from "@/mira/components/ui/direction"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/mira/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/mira/components/ui/dropdown-menu"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/mira/components/ui/empty"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/mira/components/ui/field"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/mira/components/ui/hover-card"
import { Input } from "@/mira/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/mira/components/ui/input-group"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/mira/components/ui/input-otp"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/mira/components/ui/item"
import { Kbd, KbdGroup } from "@/mira/components/ui/kbd"
import { Label } from "@/mira/components/ui/label"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/mira/components/ui/menubar"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/mira/components/ui/native-select"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/mira/components/ui/navigation-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/mira/components/ui/pagination"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/mira/components/ui/popover"
import { Progress } from "@/mira/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/mira/components/ui/radio-group"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/mira/components/ui/resizable"
import { ScrollArea } from "@/mira/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/mira/components/ui/select"
import { Separator } from "@/mira/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/mira/components/ui/sheet"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/mira/components/ui/sidebar"
import { Skeleton } from "@/mira/components/ui/skeleton"
import { Slider } from "@/mira/components/ui/slider"
import { Toaster } from "@/mira/components/ui/sonner"
import { Spinner } from "@/mira/components/ui/spinner"
import { Switch } from "@/mira/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/mira/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/mira/components/ui/tabs"
import { Textarea } from "@/mira/components/ui/textarea"
import { Toggle } from "@/mira/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/mira/components/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/mira/components/ui/tooltip"

const THEME_NAME = import.meta.env.VITE_THEME_NAME ?? "theme"

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section
      data-section={title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
      className="flex flex-col gap-3"
    >
      <h2 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        {title}
      </h2>
      <div className="flex flex-wrap items-start gap-3">{children}</div>
      <Separator className="mt-2" />
    </section>
  )
}

const buttonSizeSpecs = [
  { size: "xs", label: "Extra small" },
  { size: "sm", label: "Small" },
  { size: "default", label: "Default" },
  { size: "lg", label: "Large" },
] as const

function formatPx(value: number) {
  return `${Math.round(value * 100) / 100}px`
}

function ButtonView() {
  const sizesRef = useRef<HTMLDivElement>(null)
  const [metrics, setMetrics] = useState<
    { label: string; fontSize: string; height: string; paddingX: string }[]
  >([])

  useLayoutEffect(() => {
    const root = sizesRef.current
    if (!root) return
    setMetrics(
      buttonSizeSpecs.flatMap((spec) => {
        const el = root.querySelector<HTMLButtonElement>(
          `[data-size="${spec.size}"]`
        )
        if (!el) return []
        const style = getComputedStyle(el)
        const left = Number.parseFloat(style.paddingLeft)
        const right = Number.parseFloat(style.paddingRight)
        return [
          {
            label: spec.label,
            fontSize: formatPx(Number.parseFloat(style.fontSize)),
            height: formatPx(el.getBoundingClientRect().height),
            paddingX:
              left === right
                ? formatPx(left)
                : `${formatPx(left)} / ${formatPx(right)}`,
          },
        ]
      })
    )
  }, [])

  return (
    <>
      <Section title="Button variants">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </Section>
      <Section title="Button sizes">
        <div ref={sizesRef} className="contents">
          {buttonSizeSpecs.map((spec) => (
            <Button key={spec.size} size={spec.size} data-size={spec.size}>
              {spec.label}
            </Button>
          ))}
        </div>
        <Button size="icon" aria-label="Add">
          <PlusIcon />
        </Button>
      </Section>
      <Section title="Button size metrics">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Size</TableHead>
              <TableHead>Font size</TableHead>
              <TableHead>Height</TableHead>
              <TableHead>Padding x</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {metrics.map((row) => (
              <TableRow key={row.label}>
                <TableCell className="font-medium">{row.label}</TableCell>
                <TableCell>{row.fontSize}</TableCell>
                <TableCell>{row.height}</TableCell>
                <TableCell>{row.paddingX}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>
    </>
  )
}

function ButtonGroupView() {
  return (
    <Section title="Button group">
      <ButtonGroup>
        <Button variant="outline">Years</Button>
        <Button variant="outline">Months</Button>
        <Button variant="outline">Days</Button>
      </ButtonGroup>
      <ButtonGroup>
        <ButtonGroupText>Sort by</ButtonGroupText>
        <Button variant="outline">Date</Button>
        <Button variant="outline">Name</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button>Save</Button>
        <ButtonGroupSeparator />
        <Button size="icon" aria-label="More options">
          <ChevronDownIcon />
        </Button>
      </ButtonGroup>
    </Section>
  )
}

function ToggleView() {
  return (
    <Section title="Toggle">
      <Toggle aria-label="Bold">
        <BoldIcon />
      </Toggle>
      <Toggle aria-label="Italic" defaultPressed>
        <ItalicIcon />
      </Toggle>
      <Toggle variant="outline" aria-label="Underline">
        <UnderlineIcon />
      </Toggle>
    </Section>
  )
}

function ToggleGroupView() {
  return (
    <Section title="Toggle group">
      <ToggleGroup type="multiple" variant="outline">
        <ToggleGroupItem value="bold" aria-label="Bold">
          <BoldIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          <ItalicIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline">
          <UnderlineIcon />
        </ToggleGroupItem>
      </ToggleGroup>
    </Section>
  )
}

function BadgeView() {
  return (
    <Section title="Badge">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </Section>
  )
}

function KbdView() {
  return (
    <Section title="Kbd">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span className="text-muted-foreground">+</span>
        <Kbd>C</Kbd>
      </KbdGroup>
    </Section>
  )
}

function SpinnerView() {
  return (
    <Section title="Spinner">
      <Spinner />
      <Spinner className="size-6" />
      <Button disabled>
        <Spinner /> Loading
      </Button>
    </Section>
  )
}

function AlertView() {
  return (
    <Section title="Alert">
      <Alert>
        <AlertCircleIcon />
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>
          You can add components to your app using the CLI.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription>
          Your request failed. Please try again later.
        </AlertDescription>
      </Alert>
      <Alert>
        <AlertCircleIcon />
        <AlertTitle>Update available</AlertTitle>
        <AlertDescription>
          A new version of the app is ready to install.
        </AlertDescription>
        <AlertAction>
          <Button size="sm" variant="outline">
            Update
          </Button>
        </AlertAction>
      </Alert>
    </Section>
  )
}

function FormView() {
  return (
    <Section title="Form controls">
      <FieldGroup className="w-full">
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="me@example.com" />
          <FieldDescription>We'll never share your email.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="msg">Message</FieldLabel>
          <Textarea id="msg" placeholder="Say hello" />
        </Field>
        <Field>
          <FieldLabel htmlFor="fruit">Fruit</FieldLabel>
          <Select>
            <SelectTrigger id="fruit">
              <SelectValue placeholder="Pick one" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
              <SelectItem value="pear">Pear</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <div className="flex items-center gap-2">
          <Checkbox id="tos" />
          <Label htmlFor="tos">Accept terms</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="notif" />
          <Label htmlFor="notif">Notifications</Label>
        </div>
      </FieldGroup>
    </Section>
  )
}

function FieldView() {
  return (
    <Section title="Field">
      <FieldGroup className="w-full">
        <Field>
          <FieldLabel htmlFor="field-name">Name</FieldLabel>
          <Input id="field-name" placeholder="Ada Lovelace" />
          <FieldDescription>Your full name.</FieldDescription>
        </Field>
        <Field data-invalid>
          <FieldLabel htmlFor="field-user">Username</FieldLabel>
          <Input id="field-user" aria-invalid defaultValue="taken" />
          <FieldDescription>This username is unavailable.</FieldDescription>
        </Field>
      </FieldGroup>
    </Section>
  )
}

function InputView() {
  return (
    <Section title="Input">
      <Input placeholder="Default" className="w-full" />
      <Input type="email" placeholder="Email" className="w-full" />
      <Input disabled placeholder="Disabled" className="w-full" />
    </Section>
  )
}

function InputGroupView() {
  return (
    <Section title="Input group">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search…" />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <MailIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Email" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="xs">Send</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Section>
  )
}

function InputOTPView() {
  return (
    <Section title="Input OTP">
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </Section>
  )
}

function LabelView() {
  return (
    <Section title="Label">
      <div className="flex items-center gap-2">
        <Checkbox id="label-cb" />
        <Label htmlFor="label-cb">Accept terms and conditions</Label>
      </div>
    </Section>
  )
}

function TextareaView() {
  return (
    <Section title="Textarea">
      <Textarea placeholder="Type your message here." className="w-full" />
    </Section>
  )
}

function NativeSelectView() {
  return (
    <Section title="Native select">
      <NativeSelect className="w-full">
        <NativeSelectOption value="apple">Apple</NativeSelectOption>
        <NativeSelectOption value="orange">Orange</NativeSelectOption>
        <NativeSelectOption value="pear">Pear</NativeSelectOption>
      </NativeSelect>
    </Section>
  )
}

function ComboboxView() {
  const frameworks = ["Next.js", "SvelteKit", "Remix", "Astro", "Nuxt"]
  return (
    <Section title="Combobox">
      <Combobox items={frameworks}>
        <ComboboxInput className="w-[240px]" placeholder="Search framework…" />
        <ComboboxContent>
          <ComboboxEmpty>No framework found.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Section>
  )
}

function CheckboxView() {
  return (
    <Section title="Checkbox">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Checkbox id="cb-1" />
          <Label htmlFor="cb-1">Unchecked</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="cb-2" defaultChecked />
          <Label htmlFor="cb-2">Checked</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="cb-3" disabled />
          <Label htmlFor="cb-3">Disabled</Label>
        </div>
      </div>
    </Section>
  )
}

function RadioGroupView() {
  return (
    <Section title="Radio group">
      <RadioGroup defaultValue="comfortable" className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="default" id="r1" />
          <Label htmlFor="r1">Default</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="comfortable" id="r2" />
          <Label htmlFor="r2">Comfortable</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="compact" id="r3" />
          <Label htmlFor="r3">Compact</Label>
        </div>
      </RadioGroup>
    </Section>
  )
}

/**
 * Renders the same control on the three surfaces that matter for PR #11766.
 *
 * Several of the tokens it swaps are translucent (`bg-input/90`, `bg-input/50`)
 * and become opaque (`bg-muted`). That is invisible on the page background and
 * only shows up once the control sits on a card or on a muted panel — where an
 * opaque `bg-muted` track can end up the same colour as the surface under it.
 */
const SURFACES = ["background", "card", "muted"] as const

function Surfaces({
  children,
}: {
  children: (surface: (typeof SURFACES)[number]) => ReactNode
}) {
  return (
    <div className="grid w-full gap-3 sm:grid-cols-3">
      {SURFACES.map((surface) => {
        const body = (
          <>
            <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
              {surface}
            </span>
            {children(surface)}
          </>
        )

        if (surface === "card") {
          return (
            <Card key={surface} size="sm">
              <CardContent className="flex flex-col gap-3">{body}</CardContent>
            </Card>
          )
        }

        return (
          <div
            key={surface}
            className={`flex flex-col gap-3 rounded-xl p-4 ${
              surface === "muted" ? "bg-muted" : "border"
            }`}
          >
            {body}
          </div>
        )
      })}
    </div>
  )
}

function SwitchView() {
  return (
    <Section title="Switch">
      <Surfaces>
        {(surface) => (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Switch id={`sw-off-${surface}`} />
              <Label htmlFor={`sw-off-${surface}`}>Off</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id={`sw-on-${surface}`} defaultChecked />
              <Label htmlFor={`sw-on-${surface}`}>On</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id={`sw-disabled-${surface}`} disabled />
              <Label htmlFor={`sw-disabled-${surface}`}>Disabled</Label>
            </div>
          </div>
        )}
      </Surfaces>
    </Section>
  )
}

function SliderView() {
  return (
    <Section title="Slider">
      <Surfaces>
        {() => (
          <div className="flex w-full flex-col gap-4 py-1">
            <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
            <Slider
              defaultValue={[25, 75]}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        )}
      </Surfaces>
    </Section>
  )
}

function CardView() {
  return (
    <Section title="Card">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Manage your account settings.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Each component inherits the {THEME_NAME} preset.
        </CardContent>
        <CardFooter className="gap-2">
          <Button>Save</Button>
          <Button variant="outline">Cancel</Button>
        </CardFooter>
      </Card>
    </Section>
  )
}

function ItemView() {
  return (
    <Section title="Item">
      <ItemGroup className="w-full gap-2">
        <Item variant="outline">
          <ItemMedia variant="icon">
            <UserIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Ada Lovelace</ItemTitle>
            <ItemDescription>ada@example.com</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm" variant="outline">
              Invite
            </Button>
          </ItemActions>
        </Item>
        <Item variant="outline">
          <ItemMedia variant="icon">
            <FolderIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Documents</ItemTitle>
            <ItemDescription>24 files</ItemDescription>
          </ItemContent>
          <ItemActions>
            <ChevronRightIcon className="size-4 text-muted-foreground" />
          </ItemActions>
        </Item>
      </ItemGroup>
    </Section>
  )
}

function EmptyView() {
  return (
    <Section title="Empty">
      <Empty className="w-full rounded-lg border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <InboxIcon />
          </EmptyMedia>
          <EmptyTitle>No messages</EmptyTitle>
          <EmptyDescription>
            You're all caught up. New messages will appear here.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button size="sm">
            <PlusIcon /> New message
          </Button>
        </EmptyContent>
      </Empty>
    </Section>
  )
}

function TabsView() {
  return (
    <Section title="Tabs">
      <Tabs defaultValue="a" className="w-full">
        <TabsList>
          <TabsTrigger value="a">Overview</TabsTrigger>
          <TabsTrigger value="b">Billing</TabsTrigger>
          <TabsTrigger value="c">Team</TabsTrigger>
        </TabsList>
        <TabsContent value="a" className="text-sm text-muted-foreground">
          Overview pane
        </TabsContent>
        <TabsContent value="b" className="text-sm text-muted-foreground">
          Billing pane
        </TabsContent>
        <TabsContent value="c" className="text-sm text-muted-foreground">
          Team pane
        </TabsContent>
      </Tabs>
    </Section>
  )
}

function AccordionView() {
  return (
    <Section title="Accordion">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with theme-aware default styles.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Section>
  )
}

function CollapsibleView() {
  return (
    <Section title="Collapsible">
      <Collapsible className="w-full">
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            Toggle details
            <ChevronRightIcon />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 text-sm text-muted-foreground">
          Hidden content that expands when triggered.
        </CollapsibleContent>
      </Collapsible>
    </Section>
  )
}

function AvatarView() {
  return (
    <Section title="Avatar">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>JR</AvatarFallback>
      </Avatar>
      <AvatarGroup>
        <Avatar>
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>CD</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>EF</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
    </Section>
  )
}

function ProgressView() {
  return (
    <Section title="Progress">
      <Progress value={60} className="w-full" />
    </Section>
  )
}

function SkeletonView() {
  return (
    <Section title="Skeleton">
      <div className="flex w-full items-center gap-3">
        <Skeleton className="size-12 rounded-full" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </Section>
  )
}

function SeparatorView() {
  return (
    <Section title="Separator">
      <div className="w-full">
        <p className="text-sm">Above</p>
        <Separator className="my-3" />
        <p className="text-sm">Below</p>
        <div className="mt-4 flex h-5 items-center gap-3 text-sm">
          <span>Blog</span>
          <Separator orientation="vertical" />
          <span>Docs</span>
          <Separator orientation="vertical" />
          <span>Source</span>
        </div>
      </div>
    </Section>
  )
}

function AspectRatioView() {
  return (
    <Section title="Aspect ratio">
      <div className="w-[280px]">
        <AspectRatio
          ratio={16 / 9}
          className="flex items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground"
        >
          16 / 9
        </AspectRatio>
      </div>
    </Section>
  )
}

function ScrollAreaView() {
  return (
    <Section title="Scroll area">
      <ScrollArea className="h-40 w-full rounded-md border p-4">
        <div className="flex flex-col gap-2 text-sm">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i}>Item {i + 1}</div>
          ))}
        </div>
      </ScrollArea>
    </Section>
  )
}

function ResizableView() {
  return (
    <Section title="Resizable">
      <ResizablePanelGroup
        orientation="horizontal"
        className="min-h-32 w-full rounded-lg border"
      >
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-4 text-sm">
            One
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-4 text-sm">
            Two
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </Section>
  )
}

function TableView() {
  const rows = [
    { invoice: "INV001", status: "Paid", amount: "$250.00" },
    { invoice: "INV002", status: "Pending", amount: "$150.00" },
    { invoice: "INV003", status: "Unpaid", amount: "$350.00" },
  ]
  return (
    <Section title="Table">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.invoice}>
              <TableCell className="font-medium">{row.invoice}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell className="text-right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Section>
  )
}

const chartData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig

const pieData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const pieConfig = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
  edge: { label: "Edge", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
} satisfies ChartConfig

const radialData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const totalVisitors = pieData.reduce((acc, cur) => acc + cur.visitors, 0)

function ChartView() {
  return (
    <Section title="Chart">
      <div className="w-full max-w-[360px]">
        <p className="mb-2 text-xs font-medium text-muted-foreground">Bar</p>
        <ChartContainer config={chartConfig} className="h-[220px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </div>

      <div className="w-full max-w-[360px]">
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          Pie (donut)
        </p>
        <ChartContainer
          config={pieConfig}
          className="mx-auto aspect-square h-[220px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={pieData} dataKey="visitors" nameKey="browser" innerRadius={55}>
              <RechartsLabel
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 20}
                          className="fill-muted-foreground text-xs"
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="flex-wrap gap-2"
            />
          </PieChart>
        </ChartContainer>
      </div>

      <div className="w-full max-w-[360px]">
        <p className="mb-2 text-xs font-medium text-muted-foreground">Radial</p>
        <ChartContainer
          config={pieConfig}
          className="mx-auto aspect-square h-[220px]"
        >
          <RadialBarChart
            data={radialData}
            innerRadius={30}
            outerRadius={110}
            startAngle={-90}
            endAngle={270}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="browser" />}
            />
            <RadialBar dataKey="visitors" background cornerRadius={5} />
          </RadialBarChart>
        </ChartContainer>
      </div>
    </Section>
  )
}

function CalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return (
    <Section title="Calendar">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </Section>
  )
}

function CarouselView() {
  return (
    <Section title="Carousel">
      <div className="mx-auto w-full max-w-xs px-12">
        <Carousel>
          <CarouselContent>
            {[1, 2, 3, 4, 5].map((n) => (
              <CarouselItem key={n}>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6 text-3xl font-semibold">
                    {n}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </Section>
  )
}

function BreadcrumbView() {
  return (
    <Section title="Breadcrumb">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </Section>
  )
}

function PaginationView() {
  return (
    <Section title="Pagination">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Section>
  )
}

function NavigationMenuView() {
  return (
    <Section title="Navigation menu">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[220px] gap-1 p-2">
                <li>
                  <NavigationMenuLink href="#">Introduction</NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="#">Installation</NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">Docs</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </Section>
  )
}

function MenubarView() {
  return (
    <Section title="Menubar">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>New Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Undo</MenubarItem>
            <MenubarItem>Redo</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </Section>
  )
}

function DropdownMenuView() {
  return (
    <Section title="Dropdown menu">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>My account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <UserIcon /> Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCardIcon /> Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon /> Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Section>
  )
}

function ContextMenuView() {
  return (
    <Section title="Context menu">
      <ContextMenu>
        <ContextMenuTrigger className="flex h-24 w-full items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
          Right click here
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>
            Back <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>Forward</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Reload</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </Section>
  )
}

function CommandView() {
  return (
    <Section title="Command">
      <Command className="w-full rounded-lg border">
        <CommandInput placeholder="Type a command or search…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <CalendarIcon /> Calendar
            </CommandItem>
            <CommandItem>
              <SearchIcon /> Search
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <SettingsIcon /> Settings
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </Section>
  )
}

function DialogView() {
  return (
    <Section title="Dialog">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm</DialogTitle>
            <DialogDescription>
              Are you sure you want to continue?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline">Cancel</Button>
            <Button>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Section>
  )
}

function AlertDialogView() {
  return (
    <Section title="Alert dialog">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Delete account</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Section>
  )
}

function SheetView() {
  return (
    <Section title="Sheet">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open sheet</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here.
            </SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild>
              <Button>Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </Section>
  )
}

function DrawerView() {
  return (
    <Section title="Drawer">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you sure?</DrawerTitle>
            <DrawerDescription>This action is reversible.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Section>
  )
}

function PopoverView() {
  return (
    <Section title="Popover">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent className="text-sm">
          Place content for the popover here.
        </PopoverContent>
      </Popover>
    </Section>
  )
}

function HoverCardView() {
  return (
    <Section title="Hover card">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">@shadcn</Button>
        </HoverCardTrigger>
        <HoverCardContent className="text-sm">
          The React framework — created and maintained by @vercel.
        </HoverCardContent>
      </HoverCard>
    </Section>
  )
}

function TooltipView() {
  return (
    <Section title="Tooltip">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>Add to library</TooltipContent>
      </Tooltip>
    </Section>
  )
}

function SonnerView() {
  return (
    <Section title="Sonner (toast)">
      <Button
        variant="outline"
        onClick={() =>
          toast("Event created", {
            description: "Sunday, December 03 at 9:00 AM",
            action: { label: "Undo", onClick: () => {} },
          })
        }
      >
        <BellIcon /> Show toast
      </Button>
    </Section>
  )
}

function DirectionView() {
  return (
    <Section title="Direction (RTL)">
      <DirectionProvider dir="rtl">
        <div dir="rtl" className="flex w-full items-center gap-2">
          <Button>الرئيسية</Button>
          <Button variant="outline">إعدادات</Button>
          <StarIcon className="size-4" />
        </div>
      </DirectionProvider>
    </Section>
  )
}

function SidebarView() {
  return (
    <Section title="Sidebar">
      <div className="h-[340px] w-full overflow-hidden rounded-lg border">
        <SidebarProvider className="!min-h-0 h-full">
          <Sidebar collapsible="none" className="h-full">
            <SidebarHeader className="text-sm font-semibold">
              Acme Inc
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive>
                        <HomeIcon /> Home
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <InboxIcon /> Inbox
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <CalendarIcon /> Calendar
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <SettingsIcon /> Settings
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="text-xs text-muted-foreground">
              v1.0.0
            </SidebarFooter>
          </Sidebar>
          <SidebarInset className="p-4 text-sm text-muted-foreground">
            Main content area
          </SidebarInset>
        </SidebarProvider>
      </div>
    </Section>
  )
}

function AllView() {
  return (
    <>
      <ButtonView />
      <ButtonGroupView />
      <ToggleView />
      <ToggleGroupView />
      <BadgeView />
      <KbdView />
      <SpinnerView />
      <AlertView />
      <FormView />
      <FieldView />
      <InputView />
      <InputGroupView />
      <InputOTPView />
      <LabelView />
      <TextareaView />
      <NativeSelectView />
      <ComboboxView />
      <CheckboxView />
      <RadioGroupView />
      <SwitchView />
      <SliderView />
      <CardView />
      <ItemView />
      <EmptyView />
      <TabsView />
      <AccordionView />
      <CollapsibleView />
      <AvatarView />
      <ProgressView />
      <SkeletonView />
      <SeparatorView />
      <AspectRatioView />
      <ScrollAreaView />
      <ResizableView />
      <TableView />
      <ChartView />
      <CalendarView />
      <CarouselView />
      <BreadcrumbView />
      <PaginationView />
      <NavigationMenuView />
      <MenubarView />
      <DropdownMenuView />
      <ContextMenuView />
      <CommandView />
      <DialogView />
      <AlertDialogView />
      <SheetView />
      <DrawerView />
      <PopoverView />
      <HoverCardView />
      <TooltipView />
      <SonnerView />
      <DirectionView />
      <SidebarView />
    </>
  )
}

type Route = { key: string; label: string; render: () => ReactNode }

const routes: Route[] = [
  { key: "all", label: "All", render: () => <AllView /> },
  { key: "button", label: "Button", render: () => <ButtonView /> },
  { key: "button-group", label: "Button group", render: () => <ButtonGroupView /> },
  { key: "toggle", label: "Toggle", render: () => <ToggleView /> },
  { key: "toggle-group", label: "Toggle group", render: () => <ToggleGroupView /> },
  { key: "badge", label: "Badge", render: () => <BadgeView /> },
  { key: "kbd", label: "Kbd", render: () => <KbdView /> },
  { key: "spinner", label: "Spinner", render: () => <SpinnerView /> },
  { key: "alert", label: "Alert", render: () => <AlertView /> },
  { key: "form", label: "Form", render: () => <FormView /> },
  { key: "field", label: "Field", render: () => <FieldView /> },
  { key: "input", label: "Input", render: () => <InputView /> },
  { key: "input-group", label: "Input group", render: () => <InputGroupView /> },
  { key: "input-otp", label: "Input OTP", render: () => <InputOTPView /> },
  { key: "label", label: "Label", render: () => <LabelView /> },
  { key: "textarea", label: "Textarea", render: () => <TextareaView /> },
  { key: "native-select", label: "Native select", render: () => <NativeSelectView /> },
  { key: "combobox", label: "Combobox", render: () => <ComboboxView /> },
  { key: "checkbox", label: "Checkbox", render: () => <CheckboxView /> },
  { key: "radio-group", label: "Radio group", render: () => <RadioGroupView /> },
  { key: "switch", label: "Switch", render: () => <SwitchView /> },
  { key: "slider", label: "Slider", render: () => <SliderView /> },
  { key: "card", label: "Card", render: () => <CardView /> },
  { key: "item", label: "Item", render: () => <ItemView /> },
  { key: "empty", label: "Empty", render: () => <EmptyView /> },
  { key: "tabs", label: "Tabs", render: () => <TabsView /> },
  { key: "accordion", label: "Accordion", render: () => <AccordionView /> },
  { key: "collapsible", label: "Collapsible", render: () => <CollapsibleView /> },
  { key: "avatar", label: "Avatar", render: () => <AvatarView /> },
  { key: "progress", label: "Progress", render: () => <ProgressView /> },
  { key: "skeleton", label: "Skeleton", render: () => <SkeletonView /> },
  { key: "separator", label: "Separator", render: () => <SeparatorView /> },
  { key: "aspect-ratio", label: "Aspect ratio", render: () => <AspectRatioView /> },
  { key: "scroll-area", label: "Scroll area", render: () => <ScrollAreaView /> },
  { key: "resizable", label: "Resizable", render: () => <ResizableView /> },
  { key: "table", label: "Table", render: () => <TableView /> },
  { key: "chart", label: "Chart", render: () => <ChartView /> },
  { key: "calendar", label: "Calendar", render: () => <CalendarView /> },
  { key: "carousel", label: "Carousel", render: () => <CarouselView /> },
  { key: "breadcrumb", label: "Breadcrumb", render: () => <BreadcrumbView /> },
  { key: "pagination", label: "Pagination", render: () => <PaginationView /> },
  { key: "navigation-menu", label: "Navigation menu", render: () => <NavigationMenuView /> },
  { key: "menubar", label: "Menubar", render: () => <MenubarView /> },
  { key: "dropdown-menu", label: "Dropdown menu", render: () => <DropdownMenuView /> },
  { key: "context-menu", label: "Context menu", render: () => <ContextMenuView /> },
  { key: "command", label: "Command", render: () => <CommandView /> },
  { key: "dialog", label: "Dialog", render: () => <DialogView /> },
  { key: "alert-dialog", label: "Alert dialog", render: () => <AlertDialogView /> },
  { key: "sheet", label: "Sheet", render: () => <SheetView /> },
  { key: "drawer", label: "Drawer", render: () => <DrawerView /> },
  { key: "popover", label: "Popover", render: () => <PopoverView /> },
  { key: "hover-card", label: "Hover card", render: () => <HoverCardView /> },
  { key: "tooltip", label: "Tooltip", render: () => <TooltipView /> },
  { key: "sonner", label: "Sonner", render: () => <SonnerView /> },
  { key: "direction", label: "Direction", render: () => <DirectionView /> },
  { key: "sidebar", label: "Sidebar", render: () => <SidebarView /> },
]

function readHash(): string {
  const h = window.location.hash.replace(/^#/, "")
  return routes.some((r) => r.key === h) ? h : "all"
}

function useRoute() {
  const [key, setKey] = useState<string>(() => readHash())

  useEffect(() => {
    const onHash = () => setKey(readHash())
    window.addEventListener("hashchange", onHash)

    let suppressScrollUntil = 0

    const onMessage = (e: MessageEvent) => {
      if (!e.data || typeof e.data !== "object") return
      if (
        e.data.type === "route" &&
        typeof e.data.value === "string" &&
        routes.some((r) => r.key === e.data.value) &&
        readHash() !== e.data.value
      ) {
        window.location.hash = e.data.value
      } else if (e.data.type === "scroll" && typeof e.data.value === "number") {
        const max =
          document.documentElement.scrollHeight - window.innerHeight
        if (max > 0) {
          suppressScrollUntil = Date.now() + 150
          window.scrollTo(0, Math.max(0, Math.min(1, e.data.value)) * max)
        }
      }
    }
    window.addEventListener("message", onMessage)

    const onScroll = () => {
      if (Date.now() < suppressScrollUntil) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (max <= 0) return
      const ratio = window.scrollY / max
      try {
        window.parent?.postMessage({ type: "scroll", value: ratio }, "*")
      } catch {}
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return
      }
      e.preventDefault()
      const idx = routes.findIndex((r) => r.key === readHash())
      const next =
        e.key === "ArrowDown"
          ? (idx + 1) % routes.length
          : (idx - 1 + routes.length) % routes.length
      window.location.hash = routes[next].key
      try {
        window.parent?.postMessage(
          { type: "route", value: routes[next].key },
          "*"
        )
      } catch {}
    }
    window.addEventListener("keydown", onKey)

    return () => {
      window.removeEventListener("hashchange", onHash)
      window.removeEventListener("message", onMessage)
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return key
}

export function App() {
  const activeKey = useRoute()
  const route = routes.find((r) => r.key === activeKey) ?? routes[0]

  return (
    <TooltipProvider>
      <div className="min-h-svh bg-background text-foreground">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/80 px-6 py-3 backdrop-blur">
          <div>
            <h1 className="text-sm font-semibold capitalize">{THEME_NAME}</h1>
            <p className="text-xs text-muted-foreground capitalize">
              {route.label}
            </p>
          </div>
        </header>

        <main className="mx-auto flex max-w-2xl flex-col gap-8 p-6">
          {route.render()}
        </main>
      </div>
      <Toaster />
    </TooltipProvider>
  )
}

export default App
