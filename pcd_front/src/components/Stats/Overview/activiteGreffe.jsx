import React from 'react';
import '../../../assets/css/Stats/Overview/activiteGreffe.css';

const TransplantActivityTable = () => {
  return (
    <div className="table-container">
      <h2>Evolution de l’activité de greffe au CNGMO</h2>
      <table className="transplant-table">
        <thead>
          <tr>
            <th>Services</th>
            <th>2018</th>
            <th>2019</th>
            <th>2020</th>
            <th>2021</th>
            <th>Evolution 2020-2021</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ALSH</td>
            <td>48</td>
            <td>42</td>
            <td>38</td>
            <td>49</td>
            <td>29%</td>
          </tr>
          <tr>
            <td>ASIN</td>
            <td>61</td>
            <td>49</td>
            <td>43</td>
            <td>56</td>
            <td>30%</td>
          </tr>
          <tr>
            <td>Autres</td>
            <td>4</td>
            <td>5</td>
            <td>4</td>
            <td>1</td>
            <td>-75%</td>
          </tr>
          <tr>
            <td>ISLH</td>
            <td>22</td>
            <td>23</td>
            <td>24</td>
            <td>36 (25 geno + 11 haplo)</td>
            <td>50%</td>
          </tr>
          <tr>
            <td>Auto</td>
            <td>4</td>
            <td>5</td>
            <td>8</td>
            <td>4</td>
            <td>-50%</td>
          </tr>
          <tr>
            <td>Autres</td>
            <td>13</td>
            <td>17</td>
            <td>16</td>
            <td>22</td>
            <td>37.5%</td>
          </tr>
          <tr className="total-row">
            <td>TOTAL</td>
            <td>152</td>
            <td>141</td>
            <td>133</td>
            <td>169</td>
            <td>27%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TransplantActivityTable;
