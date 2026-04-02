import { useMemo } from 'react'

export function useQueryParams() {
  return useMemo(() => {
    const params = new URLSearchParams(window.location.search)

    const getParam = (key) => params.get(key) ?? ''

    const parseArray = (key) =>
      params.get(key)
        ? params.get(key).split(',').map(s => s.trim()).filter(Boolean)
        : []

    const parseJSON = (key) => {
      try {
        return JSON.parse(decodeURIComponent(params.get(key) ?? '{}'))
      } catch {
        return {}
      }
    }

    // ── Sample data for local dev ──────────────────────────────────
    const sample = {
      customerName: 'Adithya Pai',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      planCreatedBy: ['Pranaamya', 'Sahana', 'Dr. Mehta'],
      planCreatedByDesignation: ['Psychodynamic Psychotherapist', 'Psychiatrist', 'Clinical Therapist'],
      planCreatedByQualification: ['MA Applied Psychology', 'MBBS', 'MSc Clinical Psychology'],
      assignedTherapist: 'Pranaamya',
      assignedTherapistDesignation: 'Psychodynamic Psychotherapist',
      assignedTherapistQualification: 'MA Applied Psychology\nCertified Psychodynamic Therapist',
      assignedCommManager: 'Simba',
      pricing: 67420,
      planDetails: {
        sessionFrequency: '2',
        sessionInterval: 'week',
        assessmentPlan: ['Option 1', 'Option 2'],
        psychiatryPlan: 'Plan A',
        psychiatryFrequency: '1',
        psychiatryInterval: 'month',
        psychiatrist: 'Dr. Mehta',
        nutritionist: 'Anjali',
      },
    }

    if (!params.get('customerName')) return sample

    // ── Parse real URL params ──────────────────────────────────────
    return {
      customerName:                   getParam('customerName'),
      date:                           getParam('date'),
      planCreatedBy:                  parseArray('planCreatedBy'),
      planCreatedByDesignation:       parseArray('planCreatedByDesignation'),
      planCreatedByQualification:     parseArray('planCreatedByQualification'),
      assignedTherapist:              getParam('assignedTherapist'),
      assignedTherapistDesignation:   getParam('assignedTherapistDesignation'),
      assignedTherapistQualification: getParam('assignedTherapistQualification'),
      assignedCommManager:            getParam('assignedCommManager'),
      pricing:                        Number(getParam('pricing')),
      planDetails:                    parseJSON('planDetails'),
    }
  }, [])
}