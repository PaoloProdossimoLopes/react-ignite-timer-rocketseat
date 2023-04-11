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

import { zodResolver } from '@hookform/resolvers/zod'
import { differenceInSeconds } from 'date-fns'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'

const newCycleFormValidationSchema = zod.object({
  taskName: zod.string().min(1, 'Informe a tarefa'),
  taskDuration: zod
    .number()
    .min(5, 'Informe uma duração que dure no minimo 5 minutos')
    .max(60, 'Informe uma duração menor ou igual a 60 minutos'),
})

//                                \/---| referenciando uma variavel javascript no typescrypt
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  taskName: string
  taskDuration: number
  startDate: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeID, setActiveID] = useState<string | null>(null)
  const [secondsPassed, setSecondsPassed] = useState<number>(0)

  const { register, handleSubmit, watch, formState, reset } =
    useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: { taskName: '', taskDuration: 0 },
    })

  const taskName = watch('taskName')
  const taskDuration = watch('taskDuration')
  const isSubmitDisabled = !(taskName && taskDuration)

  console.log(`DEBUG: Erros -> ${formState.errors}`)

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycleStartsAt = new Date().getTime()
    const newCycleID = String(newCycleStartsAt)
    const newCycle: Cycle = {
      id: newCycleID,
      taskName: data.taskName,
      taskDuration: data.taskDuration,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveID(newCycleID)
    setSecondsPassed(0)
    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeID)
  const cycleSeconds = activeCycle ? activeCycle.taskDuration * 60 : 0
  const currentCycleTimeAmount = activeCycle ? cycleSeconds - secondsPassed : 0

  const minutesRest = Math.floor(currentCycleTimeAmount / 60)
  const secondsRest = currentCycleTimeAmount % 60

  const minutes = String(minutesRest).padStart(2, '0')
  const seconds = String(secondsRest).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `Ignite timer - ${minutes}:${seconds}`
    }
  }, [minutes, seconds])

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      const oneSecond = 1000
      interval = setInterval(() => {
        setSecondsPassed(differenceInSeconds(new Date(), activeCycle.startDate))
      }, oneSecond)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle])

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
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <SeparatorContainer>:</SeparatorContainer>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
