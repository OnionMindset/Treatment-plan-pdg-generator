import { useMemo } from 'react'

export function useQueryParams() {
  return useMemo(() => {
    const params = new URLSearchParams(window.location.search)

    // ── Helper to get a single param ──────────────────────────────
    const getParam = (key) => params.get(key) ?? ''

    // ── Parse array params (comma-separated from Retool) ──────────
    const planCreatedBy = params.get('planCreatedBy')
      ? params.get('planCreatedBy').split(',').map(s => s.trim()).filter(Boolean)
      : []

    const normalizedDesignations = params.get('planCreatedByDesignation')
      ? params.get('planCreatedByDesignation').split(',').map(s => s.trim()).filter(Boolean)
      : []

    // ── Sample data — used when no URL params present (local testing)
    const sample = {
      customerName: 'Adithya Pai',

      // Page 2
      planCreatedBy: ['Dr Samarth', 'Pranaamya', 'Sahana'],
      planCreatedByDesignation: [
        'Psychodrama Practitioner',
        'Psychodynamic Psychotherapist',
        'Clinical Nutritionist',
      ],

      // Page 3
      assignedTherapist: 'Pranaamya',
      assignedTherapistDesignation: 'Psychodynamic Psychotherapist',
      assignedTherapistQaulification: 'MA Applied Psychology (clinical)\nCertified Psychodynamic Therapist',
      assignedCommManager: 'Simba',
      pricing: 67420,
      planDetails:
        'This 30-day plan focuses on emotional regulation, structured reflection, and behavioral change.\n\nSessions will combine psychiatric evaluation with psychodynamic techniques to explore underlying patterns and improve coping strategies.',
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
      }),
    }

    // If no customerName in URL → use sample (local dev)
    if (!params.get('customerName')) return sample

    // Otherwise parse real URL params from Retool
    return {
      customerName:                    getParam('customerName'),
      assignedTherapist:               getParam('assignedTherapist'),
      assignedTherapistDesignation:    getParam('assignedTherapistDesignation'),
      assignedTherapistQaulification:  getParam('assignedTherapistQaulification'),
      assignedCommManager:             getParam('assignedCommManager'),
      pricing:                         Number(getParam('pricing')),
      planDetails:                     getParam('planDetails'),
      planCreatedBy,
      planCreatedByDesignation:        normalizedDesignations,
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
      }),
    }
  }, [])
}