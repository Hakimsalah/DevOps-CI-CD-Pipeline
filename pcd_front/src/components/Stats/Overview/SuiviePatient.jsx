import '../assets/css/SuiviePatient.css'
export const SuiviTable = () => {
    return (

        <table>
            <thead>
                <tr>
                    <th>Type de greffe </th>
                    <th>Maladie</th>
                    <th>Survie globale à 6 ans</th>

                </tr>
            </thead>

            <tr>
                <td rowSpan={2}>Allogreffe</td>
                <td>Aplasie médullaire</td>
                <td>85 %</td>

            </tr>

            <tr>
                
                <td>Leucémie aigu</td>
                <td>58 %</td>

            </tr>

            <tr>
                <td rowSpan={2}>Autogreffe</td>
                <td>Myélome multiple</td>
                <td>54 %</td>

            </tr>

            <tr>
                
                <td>Lymphome</td>
                <td>77 %</td>

            </tr>

        </table>
    )
}