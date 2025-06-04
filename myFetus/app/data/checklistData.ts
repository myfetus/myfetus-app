export interface ChecklistItem {
  id: string;
  title: string;
  description?: string;
  type: 'exam' | 'consultation' | 'test' | 'monitoring';
  completed: boolean;
}

export interface WeekChecklist {
  weekRange: string;
  items: ChecklistItem[];
}

export const checklistData: WeekChecklist[] = [
  {
    weekRange: "1-4",
    items: [
      {
        id: "1-4-1",
        title: "Teste de gravidez",
        description: "Teste de farmácia ou Beta-hCG sanguíneo, caso haja suspeita",
        type: "test",
        completed: false
      },
      {
        id: "1-4-2",
        title: "Agendar primeira consulta pré-natal",
        description: "Após confirmação da gravidez",
        type: "consultation",
        completed: false
      }
    ]
  },
  {
    weekRange: "5-8",
    items: [
      {
        id: "5-8-1",
        title: "Primeira consulta pré-natal",
        description: "Anamnese completa, exame físico",
        type: "consultation",
        completed: false
      },
      {
        id: "5-8-2",
        title: "Exames laboratoriais iniciais",
        description: "Tipagem sanguínea, Fator Rh, Hemograma, Glicemia, Sorologias",
        type: "exam",
        completed: false
      },
      {
        id: "5-8-3",
        title: "Ultrassonografia inicial",
        description: "Confirmar gravidez intrauterina, número de embriões, batimentos cardíacos",
        type: "exam",
        completed: false
      }
    ]
  },
  {
    weekRange: "11-14",
    items: [
      {
        id: "11-14-1",
        title: "Ultrassonografia morfológica de 1º trimestre",
        description: "Translucência nucal, osso nasal, ducto venoso",
        type: "exam",
        completed: false
      },
      {
        id: "11-14-2",
        title: "Consulta de rotina",
        description: "Se cair na periodicidade mensal",
        type: "consultation",
        completed: false
      }
    ]
  },
  {
    weekRange: "20-24",
    items: [
      {
        id: "20-24-1",
        title: "Ultrassonografia morfológica de 2º trimestre",
        description: "Avaliação anatômica completa do bebê",
        type: "exam",
        completed: false
      },
      {
        id: "20-24-2",
        title: "Medida do colo uterino",
        description: "Ultrassonografia transvaginal se necessário",
        type: "exam",
        completed: false
      }
    ]
  },
  {
    weekRange: "24-28",
    items: [
      {
        id: "24-28-1",
        title: "Teste de Tolerância à Glicose",
        description: "TOTG 75g para rastreamento de diabetes gestacional",
        type: "test",
        completed: false
      },
      {
        id: "24-28-2",
        title: "Repetição de exames",
        description: "Hemograma e sorologias",
        type: "exam",
        completed: false
      }
    ]
  },
  {
    weekRange: "33-36",
    items: [
      {
        id: "33-36-1",
        title: "Ultrassonografia do 3º trimestre",
        description: "Crescimento fetal, posição, líquido amniótico",
        type: "exam",
        completed: false
      },
      {
        id: "33-36-2",
        title: "Pesquisa de Streptococcus do Grupo B",
        description: "Coleta entre 35ª e 37ª semana",
        type: "test",
        completed: false
      }
    ]
  },
  {
    weekRange: "37-40",
    items: [
      {
        id: "37-40-1",
        title: "Consultas semanais",
        description: "Monitoramento do bem-estar fetal",
        type: "consultation",
        completed: false
      },
      {
        id: "37-40-2",
        title: "Cardiotocografia",
        description: "Se indicado pelo médico",
        type: "monitoring",
        completed: false
      }
    ]
  }
];

export function getChecklistForWeek(currentWeek: number): WeekChecklist | null {
  return checklistData.find(checklist => {
    const [start, end] = checklist.weekRange.split("-").map(Number);
    return currentWeek >= start && currentWeek <= end;
  }) || null;
} 