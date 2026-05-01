import React, { useState } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { MoreHorizontal, Pencil, Trash2, Eye, Plus } from 'lucide-react'
import Button from '../components/Button'
import Input from '../components/Input'
import Card from '../components/Card'
import styles from './CustomersPage.module.scss'

interface Customer {
  id: string
  name: string
  email: string
  plan: 'Free' | 'Pro' | 'Enterprise'
  status: 'Active' | 'Inactive'
}

const initialCustomers: Customer[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', plan: 'Pro', status: 'Active' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', plan: 'Enterprise', status: 'Active' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', plan: 'Free', status: 'Inactive' },
  { id: '4', name: 'Diana Prince', email: 'diana@example.com', plan: 'Pro', status: 'Active' },
  { id: '5', name: 'Ethan Hunt', email: 'ethan@example.com', plan: 'Enterprise', status: 'Inactive' },
]

type FormMode = 'create' | 'edit' | null

const emptyForm = { name: '', email: '', plan: 'Free' as Customer['plan'], status: 'Active' as Customer['status'] }

const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers)
  const [formMode, setFormMode] = useState<FormMode>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState(emptyForm)
  const [viewingCustomer, setViewingCustomer] = useState<Customer | null>(null)

  const openCreate = () => {
    setFormData(emptyForm)
    setEditingId(null)
    setFormMode('create')
  }

  const openEdit = (customer: Customer) => {
    setFormData({
      name: customer.name,
      email: customer.email,
      plan: customer.plan,
      status: customer.status,
    })
    setEditingId(customer.id)
    setFormMode('edit')
  }

  const closeForm = () => {
    setFormMode(null)
    setEditingId(null)
    setFormData(emptyForm)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim()) return

    if (formMode === 'create') {
      const newCustomer: Customer = {
        id: Date.now().toString(),
        ...formData,
      }
      setCustomers((prev) => [...prev, newCustomer])
    } else if (formMode === 'edit' && editingId) {
      setCustomers((prev) =>
        prev.map((c) => (c.id === editingId ? { ...c, ...formData } : c)),
      )
    }
    closeForm()
  }

  const handleDelete = (id: string) => {
    if (confirm('Delete this customer?')) {
      setCustomers((prev) => prev.filter((c) => c.id !== id))
    }
  }

  return (
    <div className={styles.customersPage}>
      <div className={styles.header}>
        <h1>Customers</h1>
        <Button onClick={openCreate} className={styles.addButton}>
          <Plus size={16} />
          <span>Add Customer</span>
        </Button>
      </div>

      <Card className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Plan</th>
                <th>Status</th>
                <th className={styles.actionsHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={5} className={styles.empty}>
                    No customers yet. Click "Add Customer" to create one.
                  </td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>
                      <span className={`${styles.badge} ${styles[`plan${customer.plan}`]}`}>
                        {customer.plan}
                      </span>
                    </td>
                    <td>
                      <span className={`${styles.badge} ${styles[`status${customer.status}`]}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className={styles.actionsCell}>
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                          <button className={styles.menuTrigger} aria-label="Open actions menu">
                            <MoreHorizontal size={18} />
                          </button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                          <DropdownMenu.Content
                            className={styles.menuContent}
                            align="end"
                            sideOffset={4}
                          >
                            <DropdownMenu.Item
                              className={styles.menuItem}
                              onSelect={() => setViewingCustomer(customer)}
                            >
                              <Eye size={14} />
                              <span>View Details</span>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item
                              className={styles.menuItem}
                              onSelect={() => openEdit(customer)}
                            >
                              <Pencil size={14} />
                              <span>Edit</span>
                            </DropdownMenu.Item>
                            <DropdownMenu.Separator className={styles.menuSeparator} />
                            <DropdownMenu.Item
                              className={`${styles.menuItem} ${styles.menuItemDanger}`}
                              onSelect={() => handleDelete(customer.id)}
                            >
                              <Trash2 size={14} />
                              <span>Delete</span>
                            </DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                      </DropdownMenu.Root>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {formMode !== null && (
        <div className={styles.modalOverlay} onClick={closeForm}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>{formMode === 'create' ? 'Add Customer' : 'Edit Customer'}</h2>
            <form onSubmit={handleSubmit}>
              <Input
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />

              <div className={styles.field}>
                <label className={styles.fieldLabel}>Plan</label>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button type="button" className={styles.selectTrigger}>
                      {formData.plan}
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content className={styles.menuContent} sideOffset={4}>
                      {(['Free', 'Pro', 'Enterprise'] as const).map((plan) => (
                        <DropdownMenu.Item
                          key={plan}
                          className={styles.menuItem}
                          onSelect={() => setFormData({ ...formData, plan })}
                        >
                          {plan}
                        </DropdownMenu.Item>
                      ))}
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </div>

              <div className={styles.field}>
                <label className={styles.fieldLabel}>Status</label>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button type="button" className={styles.selectTrigger}>
                      {formData.status}
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content className={styles.menuContent} sideOffset={4}>
                      {(['Active', 'Inactive'] as const).map((status) => (
                        <DropdownMenu.Item
                          key={status}
                          className={styles.menuItem}
                          onSelect={() => setFormData({ ...formData, status })}
                        >
                          {status}
                        </DropdownMenu.Item>
                      ))}
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </div>

              <div className={styles.modalActions}>
                <Button type="button" variant="outline" onClick={closeForm}>
                  Cancel
                </Button>
                <Button type="submit">
                  {formMode === 'create' ? 'Create' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewingCustomer && (
        <div className={styles.modalOverlay} onClick={() => setViewingCustomer(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Customer Details</h2>
            <dl className={styles.detailsList}>
              <dt>Name</dt>
              <dd>{viewingCustomer.name}</dd>
              <dt>Email</dt>
              <dd>{viewingCustomer.email}</dd>
              <dt>Plan</dt>
              <dd>{viewingCustomer.plan}</dd>
              <dt>Status</dt>
              <dd>{viewingCustomer.status}</dd>
              <dt>Customer ID</dt>
              <dd>{viewingCustomer.id}</dd>
            </dl>
            <div className={styles.modalActions}>
              <Button onClick={() => setViewingCustomer(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomersPage
