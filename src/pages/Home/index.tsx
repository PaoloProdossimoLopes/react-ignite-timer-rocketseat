import { Play } from 'phosphor-react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinuteAmountInput,
  SeparatorContainer,
  StartCountdownButton,
  TaskInput,
} from './style'

import { useForm } from 'react-hook-form'

export function Home() {
  const { register, handleSubmit, watch } = useForm()

  const taskName = watch('taskName')
  const taskDuration = watch('taskDuration')
  const isSubmitDisabled = !(taskName && taskDuration)

  function handleCreateNewCycle(data: any) {}

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="">Vou trabalhar em</label>
          <TaskInput
            id="task"
            type="text"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('taskName')}
          />
          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>

          <label htmlFor="">durante</label>
          <MinuteAmountInput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('taskDuration', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <SeparatorContainer>:</SeparatorContainer>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
