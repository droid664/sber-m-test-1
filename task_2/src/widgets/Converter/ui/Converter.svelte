<script lang="ts">
  import { onMount } from 'svelte'
  import { fetchGetCodes, codes } from '../model/codes.store'
  import { get } from 'svelte/store'
  import { Select } from '../../../shared'
  import { parseCurrency } from '../model/parseCurrency'
  import { fetchGetPairConversion, pairData } from '../model/pariConversion.store'

  let codesList: string[] = []
  let selectedFirst: string = ''
  let selectedSecond: string = ''
  let sumFirst: string = '1'
  let sumSecond: string = '0'

  const updateSelectedFirst = async (event: CustomEvent<string>) => {
    selectedFirst = event.detail

    await changeSelectedCurrency()
    updateSecondValue()
  }

  const updateSelectedSecond = async (event: CustomEvent<string>) => {
    selectedSecond = event.detail

    await changeSelectedCurrency()
    updateFirstValue()
  }

  const updateFirstValue = () => {
    sumFirst = String(Number(sumSecond) / get(pairData).conversion_rate)
  }

  const updateSecondValue = () => {
    sumSecond = String(Number(sumFirst) * get(pairData).conversion_rate)
  }

  const changeSelectedCurrency = async () => {
    const first = parseCurrency(selectedFirst)
    const second = parseCurrency(selectedSecond)

    await fetchGetPairConversion(first, second)
  }

  const filterInputValue = (value: string) => {
    let newVal = value.replace(/[^0-9.]/g, '')

    if (newVal.length >= 15) {
      newVal = newVal.slice(0, 15)
    }

    let dots = newVal.match(/\./g)

    if (dots && dots.length > 1) {
      let dotCount = 0
      newVal = newVal
        .split('')
        .filter((char) => {
          if (char === '.') {
            dotCount++
            return dotCount <= 1
          }
          return true
        })
        .join('')
    }

    return newVal
  }

  onMount(async () => {
    await fetchGetCodes()

    codesList = get(codes)

    selectedFirst = codesList[0]
    selectedSecond = codesList[1]

    await changeSelectedCurrency()

    updateSecondValue()
  })

  $: filteredListFirst = codesList.filter((item) => item !== selectedSecond)
  $: filteredListSecond = codesList.filter((item) => item !== selectedFirst)
  $: sumFirst = filterInputValue(sumFirst)
  $: sumSecond = filterInputValue(sumSecond)
</script>

<div class="converter">
  <div class="container">
    <h1>Converter</h1>
    {#if codesList.length && selectedFirst && selectedSecond}
      <div class="row">
        <div class="col-md-6 d-flex flex-column mb-3 mb-md-0">
          <h2 class="mb-auto pb-3">{selectedFirst}</h2>
          <Select
            selected={selectedFirst}
            options={filteredListFirst}
            on:change={updateSelectedFirst}
          />
          <input
            type="text"
            class="form-control"
            bind:value={sumFirst}
            on:input={() => updateSecondValue()}
            inputmode="numeric"
          />
        </div>
        <div class="col-md-6 d-flex flex-column">
          <h2 class="mb-auto pb-3">{selectedSecond}</h2>
          <Select
            selected={selectedSecond}
            options={filteredListSecond}
            on:change={updateSelectedSecond}
          />
          <input
            type="text"
            class="form-control"
            bind:value={sumSecond}
            on:input={() => updateFirstValue()}
            inputmode="numeric"
          />
        </div>
      </div>
    {/if}
  </div>
</div>
