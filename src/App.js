import React, { Component } from 'react'
import { calculateSalaryFrom } from './helpers/salary'
import InputReadOnly from './components/InputReadOnly'

import css from './index.module.css'
import { moneyFormat, percentFormat } from './helpers/formatNumber'

import { Pie } from 'react-chartjs-2'

export default class App extends Component {

  constructor() {
    super()

    this.state = {
      data: 0,
      grossSalary: 0,
      inssBase: 0,
      inssDiscount: 0,
      irpfBase: 0,
      irpfDiscount: 0,
      netSalary: 0,

    }
  }

  componentDidMount() {
    this.handleInputGrossSalary({ target: { value: 1000 } })

  }

  handleInputGrossSalary = (e) => {

    const grossSalary = e.target.value

    const {
      inssBase,
      inssDiscount,
      irpfBase,
      irpfDiscount,
      netSalary,
    } = calculateSalaryFrom(grossSalary)

    const data = {
      labels: [
        'Desconto INSS',
        'Desconto IRPF',
        'Salário líquido'
      ],
      datasets: [{
        data: [inssDiscount, irpfDiscount, netSalary],
        backgroundColor: [
          ' #e67e22',
          '#c0392b',
          '#16a085'
        ],
        hoverBackgroundColor: [
          ' #e67e22',
          '#c0392b',
          '#16a085'
        ]
      }]
    }


    this.setState({

      data,
      grossSalary,
      inssBase,
      inssDiscount,
      irpfBase,
      irpfDiscount,
      netSalary,

    })

  }

  render() {

    const { data,
      grossSalary,
      inssBase,
      inssDiscount,
      irpfBase,
      irpfDiscount,
      netSalary } = this.state

    const percentNetSalary = percentFormat(netSalary / grossSalary);
    const inssPercent = percentFormat(inssDiscount / grossSalary);
    const irpfPercent = percentFormat(irpfDiscount / grossSalary);

    return (

      <div className={css.salaryContainer}>

        <h1 className={css.mainTitle}>Salary React App</h1>


        <table className={css.divValues}>

          <tr>
            <td>
              <label >Salário bruto</label>
            </td>
            <td>
              <input
                type="number"
                className={css.grossSalary}
                onChange={this.handleInputGrossSalary}
                value={grossSalary} />

            </td>
          </tr>

          <InputReadOnly
            label={'Base INSS'} >
            {moneyFormat(inssBase)}
          </InputReadOnly>

          <InputReadOnly
            label={'Desconto INSS'}
            color={'#e67e22'}
            discount={inssPercent}
          >
            {moneyFormat(inssDiscount)}
          </InputReadOnly>

          <InputReadOnly
            label={'Base IRPF'} >
            {moneyFormat(irpfBase)}
          </InputReadOnly>


          <InputReadOnly
            label={'Desconto IRPF'}
            color={'#c0392b'}
            discount={irpfPercent}
          >
            {moneyFormat(irpfDiscount)}
          </InputReadOnly>


          <InputReadOnly
            label={'Salário líquido'}
            color={'#16a085'}
            discount={percentNetSalary}
          >
            {moneyFormat(netSalary)}
          </InputReadOnly>

        </table>


        <div className={css.chartjs}>
          <Pie data={data} />
        </div>


      </div >

    )
  }
}
