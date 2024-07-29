<template>
  <div class="container">
    <div class="row gap-10 g-0 justify-content-center align-items-center">
      <div class="row gap-5 g-0 justify-content-between">
        <div class="col-auto">
          <h1>Qui😴</h1>
        </div>
        <div class="col-12 col-lg">
          <div class="row g-4 align-items-center">
            <div class="col">
              <div class="progress">
                <div
                  :class="{ ['bg-danger']: exam.currentQuestion?.remainingTime < 10 }"
                  class="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  :style="{ width: (100 * exam.currentQuestion?.remainingTime) / 30 + '%' }">
                  <span>
                    <QBadge variant="secondary">{{ exam.currentQuestion?.remainingTime }} </QBadge>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-auto">
              <QBadge variant="secondary">{{
                `${exam.remainingQuestions?.length} / ${exam.questions?.length}`
              }}</QBadge>
            </div>
            <div class="col-auto">
              <div class="row g-4">
                <div class="col-auto">
                  <QButton
                    lg
                    :disabled="exam.startedAt || exam.finishedAt"
                    variant="primary"
                    @click="() => exam.start()"
                    >{{ $t('start') }}</QButton
                  >
                </div>
                <div class="col-auto">
                  <QButton
                    v-if="devMode"
                    lg
                    :disabled="!exam.startedAt && !exam.finishedAt"
                    variant="outline-secondary"
                    @click="() => exam.reset()"
                    >{{ $t('reset') }}</QButton
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="exam.currentQuestion" class="col-12">
        <div
          class="row g-4"
          :class="{ ['question-blur pe-none']: !exam.currentQuestion?.startedAt }">
          <h3>{{ exam.currentQuestion?.title }} ?</h3>
          <div
            v-for="option in exam.currentQuestion?.options"
            :key="snakeCase(option)"
            class="col-12">
            <QFormControl
              :model-value="get(exam, 'currentQuestion.selectedAnswer')"
              type="radio"
              :label="option"
              :value="option"
              :name="exam.currentQuestion?.title"
              @change="set(exam.currentQuestion, `selectedAnswer`, option)" />
          </div>
        </div>
        <div class="row justify-content-end">
          <div class="col-auto">
            <QButton
              lg
              :disabled="
                (!devMode && exam.currentQuestion.remainingTime > 20) ||
                !exam.currentQuestion?.startedAt
              "
              variant="success"
              @click="exam.currentQuestion?.solve()">
              {{ $t('solve') }}
            </QButton>
          </div>
        </div>
      </div>
      <QDataTable
        v-if="exam.finishedAt"
        :options="{
          columns: [
            {
              title: 'question',
              accessor: 'title',
            },
            {
              title: 'answer',
              accessor: 'answer',
            },
            {
              title: 'remaining_time',
              accessor: 'remainingTime',
            },
          ],
          data: exam.solvedQuestions,
        }">
        <template #answer="{ row, col }">
          {{ isNil(get(row, col.accessor)) ? $t('empty') : get(row, col.accessor) }}
        </template>
        <template #remaining_time="{ row, col }">
          <QBadge :variant="get(row, col.accessor) < 10 ? 'danger' : 'success'"
            >{{ get(row, col.accessor) }}
          </QBadge>
        </template>
      </QDataTable>
    </div>
  </div>
</template>
<script setup>
import QuestionApi from '@api/QuestionApi';
import SingleResourceResponse from '@dto/SingleResourceResponse';
import { Exam } from '@models/Exam';
import { Question } from '@models/Question';

const devMode = import.meta.env.MODE == 'development';
const route = useRoute();

const questionCount = get(route.query, 'count', 10);
const questionData = take((await QuestionApi.list()).data, questionCount);
const questions = SingleResourceResponse.create().map(Question).merge(questionData);

const exam = Exam.create().merge({ questions });
</script>

<style>
.question-blur {
  filter: blur(5px);
}
</style>
