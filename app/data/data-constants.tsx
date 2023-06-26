import {
  ArrowDownToLine,
  ArrowRightToLine,
  ArrowUpCircle,
  ArrowUpToLine,
  CheckCircle2,
  Circle,
  HelpCircle,
  XCircle,
} from "lucide-react"

// Refactor

export const TAGS = [
  {
    value: "nodejs",
    label: "NodeJS",
  },
  {
    value: "reactjs",
    label: "ReactJS",
  },
  {
    value: "wordpress",
    label: "WordPress",
  },
  {
    value: "php",
    label: "PHP",
  },
  {
    value: "marketing",
    label: "Marketing",
  },
  {
    value: "design",
    label: "Design",
  },
  {
    value: "seo",
    label: "SEO",
  },
  {
    value: "ecommerce",
    label: "Ecommerce",
  },
]

export const CATEGORIES = [
  {
    value: "tech",
    label: "Tech",
  },
  {
    value: "marketing",
    label: "Marketing",
  },
  {
    value: "design",
    label: "Design",
  },
  {
    value: "seo",
    label: "SEO",
  },
  {
    value: "ecommerce",
    label: "Ecommerce",
  },
]

export const PROJECT_PRIORITIES = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownToLine,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightToLine,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpToLine,
  },
]

export const PROJECT_STATUSES = [
  {
    value: "backlog",
    label: "Backlog",
    icon: HelpCircle,
  },
  {
    value: "todo",
    label: "Todo",
    icon: Circle,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: ArrowUpCircle,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircle2,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: XCircle,
  },
]

export const PAYMENT_STATUSES = [
  {
    value: "paid",
    label: "Paid",
    icon: CheckCircle2,
  },
  {
    value: "pending",
    label: "Pending",
    icon: HelpCircle,
  },
  {
    value: "overdue",
    label: "Overdue",
    icon: XCircle,
  },
]
