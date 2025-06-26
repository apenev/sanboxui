"use client"

import * as React from "react"
import { ChevronsUpDown, Plus, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Account {
  label: string
  email: string
  icon: React.ReactNode
}

interface AccountSwitcherProps {
  accounts: Account[]
}

export function AccountSwitcher({ accounts }: AccountSwitcherProps) {
  const [selectedAccount, setSelectedAccount] = React.useState<Account>(
    accounts[0]
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start gap-2 border-0 bg-transparent px-2 font-normal hover:bg-accent hover:text-accent-foreground"
        >
          {selectedAccount.icon}
          <span className="truncate">{selectedAccount.label}</span>
          <ChevronsUpDown className="ml-auto h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {selectedAccount.label}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {selectedAccount.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {accounts.map((account) => (
            <DropdownMenuItem
              key={account.email}
              className="cursor-pointer"
              onClick={() => setSelectedAccount(account)}
            >
              {account.icon}
              <span className="ml-2">{account.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Plus className="mr-2 h-4 w-4" />
            <span>Add New Customer</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}