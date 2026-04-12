import { useMemo } from 'react'

export function useQueryParams() {
  return useMemo(() => {
    const params = new URLSearchParams(window.location.search)

    // ── Helpers ─────────────────────────────────────
    const safe = (v) =>
      !v || v === 'null' || v === 'undefined' ? '' : v

    const getParam = (key) => safe(params.get(key))

    const parseArray = (key) =>
      params.get(key)
        ? params
            .get(key)
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
        : []

    const parseJSON = (key) => {
      try {
        return JSON.parse(params.get(key) || '{}')
      } catch {
        return {}
      }
    }

    // ── Sample data (used when no URL params) ───────
    const sample = {
      customerName: 'Adithya Pai',
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),

      planCreatedBy: ['Pranaamya', 'Sahana', 'Dr. Mehta'],
      planCreatedByDesignation: [
        'psychodynamic_psychotherapist',
        'psychiatrist',
        'clinical_psychologist',
      ],
      planCreatedByQualification: [
        'MA Applied Psychology',
        'MBBS',
        'MSc Clinical Psychology',
      ],

      assignedTherapist: 'Pranaamya',
      assignedTherapistDesignation: 'psychodynamic_psychotherapist',
      assignedTherapistQualification:
        'MA Applied Psychology\nCertified Psychodynamic Therapist',

      assignedPsychiatrist: 'Dr. Mehta',
      assignedPsychiatristDesignation: 'psychiatrist',
      assignedPsychiatristQualification: 'MBBS, MD Psychiatry',

      assignedNutritionist: 'Anjali',

      assignedCommManager: 'Simba',

      pricing: 67420,

      planDetails: {
        sessionFrequency: '2',
        sessionInterval: 'week',

        assessmentPlan: ['Option 1', 'Option 2'],

        psychiatryPlan: true,
        psychiatryFrequency: '1',
        psychiatryInterval: 'month',
        psychiatrist: 'Dr. Mehta',

        nutritionist: true,
        nutritionistName: 'Anjali',
      },
    }

    // ── If no params, use sample ────────────────────
    if (!params.get('customerName')) return sample

    // ── Parse real URL params ───────────────────────
    return {
      customerName: getParam('customerName'),
      date: getParam('date'),

      planCreatedBy: parseArray('planCreatedBy'),
      planCreatedByDesignation: parseArray(
        'planCreatedByDesignation'
      ),
      planCreatedByQualification: parseArray(
        'planCreatedByQualification'
      ),

      assignedTherapist: getParam('assignedTherapist'),
      assignedTherapistDesignation: getParam(
        'assignedTherapistDesignation'
      ),
      assignedTherapistQualification: getParam(
        'assignedTherapistQualification'
      ),
      assignedTherapistDisplayDesig: getParam(
        'assignedTherapistDisplayDesig'
      ),

      assignedPsychiatrist: getParam('assignedPsychiatrist'),
      assignedPsychiatristDesignation: getParam(
        'assignedPsychiatristDesignation'
      ),
      assignedPsychiatristQualification: getParam(
        'assignedPsychiatristQualification'
      ),
      assignedPsychiatristDisplayDesig: getParam(
        'assignedPsychiatristDisplayDesig'
      ),

      assignedNutritionist: getParam('assignedNutritionist'),

      assignedCommManager: getParam('assignedCommManager'),

      pricing: Number(getParam('pricing')),

      planDetails: parseJSON('planDetails'),
    }
  }, [])
}