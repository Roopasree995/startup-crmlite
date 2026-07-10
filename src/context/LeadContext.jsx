/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react'

// Hooks and sample data
import useLocalStorage from '../hooks/useLocalStorage'
import { sampleLeads } from '../data/sampleLeads'

/**
 * TypeScript-style shape definition for Lead object.
 * 
 * @typedef {Object} Lead
 * @property {string} id - The unique ID of the lead.
 * @property {string} name - The contact name of the lead.
 * @property {string} company - The company of the lead.
 * @property {string} email - The email address of the lead.
 * @property {string} phone - The phone number of the lead.
 * @property {'New'|'Contacted'|'Meeting Scheduled'|'Proposal Sent'|'Won'|'Lost'} status - Pipeline stage.
 * @property {'Website'|'Referral'|'LinkedIn'|'Cold Call'|'Email Campaign'|'Other'} source - Acquisition channel.
 * @property {string} createdAt - The creation timestamp in ISO date format.
 */

/**
 * @typedef {Object} LeadContextValue
 * @property {Lead[]} leads - The global array of leads.
 * @property {(lead: Omit<Lead, 'id' | 'createdAt'>) => void} addLead - Add a new lead to the list.
 * @property {(id: string, updatedFields: Partial<Omit<Lead, 'id' | 'createdAt'>>) => void} updateLead - Update properties of an existing lead.
 * @property {(id: string) => void} deleteLead - Delete a lead from the list.
 * @property {(id: string) => Lead | undefined} getLeadById - Retrieve details for a specific lead by id.
 */

// Create the Context object
export const LeadContext = createContext(undefined)

/**
 * LeadProvider component.
 * Wraps the application to serve the global leads state and CRUD triggers.
 * Automatically synchronizes changes to the 'startup-crm-leads' localStorage item.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components to wrap.
 * @returns {React.JSX.Element} The context Provider element.
 */
export function LeadProvider({ children }) {
  const [leads, setLeads] = useLocalStorage('startup-crm-leads', sampleLeads)

  /**
   * Appends a new lead to the list.
   * Generates a unique UUID and appends the current ISO timestamp.
   *
   * @param {Omit<Lead, 'id' | 'createdAt'>} leadData - Lead data without metadata fields.
   */
  const addLead = (leadData) => {
    const newLead = {
      ...leadData,
      id: typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    setLeads((prev) => [newLead, ...prev])
  }

  /**
   * Updates properties of an existing lead.
   *
   * @param {string} id - The ID of the lead to update.
   * @param {Partial<Omit<Lead, 'id' | 'createdAt'>>} updatedFields - Fields to modify.
   */
  const updateLead = (id, updatedFields) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, ...updatedFields } : lead))
    )
  }

  /**
   * Deletes a lead from the list.
   *
   * @param {string} id - The ID of the lead to delete.
   */
  const deleteLead = (id) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id))
  }

  /**
   * Retrieves a single lead detail by its ID.
   *
   * @param {string} id - The ID of the lead to retrieve.
   * @returns {Lead | undefined} The matching lead, or undefined.
   */
  const getLeadById = (id) => {
    return leads.find((lead) => lead.id === id)
  }

  return (
    <LeadContext.Provider value={{ leads, addLead, updateLead, deleteLead, getLeadById }}>
      {children}
    </LeadContext.Provider>
  )
}

/**
 * Custom React hook to consume the Leads context.
 * Throws a descriptive error if accessed outside a valid LeadProvider tree.
 *
 * @returns {LeadContextValue} The lead context values.
 */
export function useLeads() {
  const context = useContext(LeadContext)
  if (context === undefined) {
    throw new Error('useLeads must be used inside a LeadProvider. Make sure to wrap your application in <LeadProvider>.')
  }
  return context
}
