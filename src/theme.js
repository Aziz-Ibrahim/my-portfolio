import { createTheme } from '@mantine/core';

export const theme = createTheme({
  colors: {
    graphite: [
      '#F6F8FB',
      '#E5EAF0',
      '#CBD5E1',
      '#94A3B8',
      '#64748B',
      '#475569',
      '#334155',
      '#1E293B',
      '#111827',
      '#070B12'
    ],
    signal: [
      '#F1F5F7',
      '#E1E9EE',
      '#C9D7E0',
      '#AEC2CF',
      '#94ACBC',
      '#7F99AB',
      '#667F91',
      '#526676',
      '#3D4D59',
      '#29343C'
    ],
    mint: [
      '#F1F5F2',
      '#DFE8E2',
      '#C8D8CE',
      '#AEC5B7',
      '#8FAE9D',
      '#789787',
      '#607A6C',
      '#4D6257',
      '#394940',
      '#28332D'
    ],
  },
  primaryColor: 'signal',
  defaultRadius: 'md',
  fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  headings: {
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontWeight: '750',
  },
});
