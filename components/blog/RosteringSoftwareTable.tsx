import styles from './RosteringSoftwareTable.module.css'

// Global and US editions use separate comparison artwork in the CMS.
export const rosteringSoftwareTableImages = new Set([
  'image-eba39a3cc5a7cb67a00f09ada090a1f5e560bd3f-2400x1110-png',
  'image-9a99f6381fff1436a447185972e003c1b75fa877-2400x1110-png',
])

export default function RosteringSoftwareTable({ isUS = false }: { isUS?: boolean }) {
  const scheduling = isUS ? 'scheduling' : 'rostering'
  const rosters = isUS ? 'schedules' : 'rosters'
  const rows = [
    {
      type: 'Digital',
      before: '',
      after: ` ${scheduling} software`,
      offers: `Tools to manually create, edit and publish ${rosters}, manage requests and share schedules with staff.`,
      suited: `Teams moving away from spreadsheets or paper ${rosters}.`,
    },
    {
      type: 'simple automation',
      before: `${isUS ? 'Scheduling' : 'Rostering'} software with `,
      after: '',
      offers: `Automates routine ${scheduling} tasks and some shift assignments using predefined rules, such as staff availability, qualifications and contracted hours.`,
      suited: 'Teams with relatively straightforward staffing requirements and predictable shift patterns.',
    },
    {
      type: isUS ? 'Optimization-based' : 'Optimisation-based',
      before: '',
      after: ` ${scheduling} software`,
      offers: `Generates complete ${rosters} by evaluating staffing requirements, rules and preferences together to find a well-balanced solution.`,
      suited: `Healthcare teams managing complex ${rosters} with multiple constraints and competing priorities.`,
    },
  ]

  return (
    <div className={`not-prose ${styles.comparison}`}>
      <table className={styles.table} role="table">
        <caption className="sr-only">
          Three types of healthcare {scheduling} software: what it offers and who it&apos;s suited for
        </caption>
        <thead role="rowgroup">
          <tr role="row">
            <th scope="col" role="columnheader">Healthcare {scheduling} software type</th>
            <th scope="col" role="columnheader">What it offers</th>
            <th scope="col" role="columnheader">Typically suited for</th>
          </tr>
        </thead>
        <tbody role="rowgroup">
          {rows.map((row) => (
            <tr key={row.type} role="row">
              <th scope="row" role="rowheader">
                {row.before}<span className={styles.highlight}>{row.type}</span>{row.after}
              </th>
              <td role="cell">
                <span className={styles.mobileLabel} aria-hidden="true">What it offers</span>
                {row.offers}
              </td>
              <td role="cell">
                <span className={styles.mobileLabel} aria-hidden="true">Typically suited for</span>
                {row.suited}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
