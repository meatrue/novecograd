import { Accordion, Skeleton } from '@/components/ui-kit';
import { ISurveyVoted } from '@/interfaces/surveys';
import { SurveyVotedStatistics } from '../SurveyVotedStatistics';

interface ISurveysListProps {
  items: ISurveyVoted[];
  isLoading: boolean;
}

export const SurveysVotedList: React.FC<ISurveysListProps> = ({
  items,
  isLoading,
}) => (
  <div className="flex flex-col gap-1">
    {isLoading && [...new Array(3)].map((_, index) => (
      <Skeleton
        key={index}
        className="h-22 rounded-md"
        bgClassName="bg-slate-300"
      />    
    ))}

    {!isLoading && !!items.length && items.map((survey) => (
      <Accordion
        key={survey.id}
        title={
          <div
            className="[&_a]:text-blue-700 [&_a]:underline [&_a]:hover:no-underline"
            dangerouslySetInnerHTML={{ __html: survey.title }}
          />  
        }
        content={
          <SurveyVotedStatistics statistics={survey.options} />
        }
      />
    ))}

    {!isLoading && !items.length && (
      <div className="py-10 text-center">Опросов не найдено</div>
    )}
  </div>
);
