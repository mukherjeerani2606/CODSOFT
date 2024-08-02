
import java.util.Scanner;
import java.util.Timer;
import java.util.TimerTask;

class Question {
    String question;
    String[] options;
    char correctAnswer;

    public   void Question(String question, String[] options, char correctAnswer) {
        this.question = question;
        this.options = options;
        this.correctAnswer = correctAnswer;
    }
}

public class task03 {
    private static final Scanner scanner = new Scanner(System.in);
    private static int score = 0;
    private static int questionIndex = 0;
    private static boolean answered = false;

    private static question[] questions = new question[]{
            new question("What is the capital of France?", new String[]{"A. Berlin", "B. Madrid", "C. Paris", "D. Rome"}, 'C'),
            new question("Which planet is known as the Red Planet?", new String[]{"A. Earth", "B. Mars", "C. Jupiter", "D. Venus"}, 'B'),
            new question("Who wrote 'To Kill a Mockingbird'?", new String[]{"A. Harper Lee", "B. Mark Twain", "C. J.K. Rowling", "D. Jane Austen"}, 'A'),
    };

    public static void main(String[] args) {
        for (questionIndex = 0; questionIndex < questions.length; questionIndex++) {
            answered = false;
            askQuestion(questions[questionIndex]);
        }
        displayResults();
    }

    private static void askQuestion(question question) {
        System.out.println(question.question);
        for (String option : question.options) {
            System.out.println(option);
        }

        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                if (!answered) {
                    System.out.println("Time's up! Moving to the next question.");
                    answered = true;
                }
            }
        }, 10000);  // 10 seconds for each question

        while (!answered) {
            String answer = scanner.nextLine().toUpperCase();
            if (answer.length() == 1 && "ABCD".indexOf(answer.charAt(0)) != -1) {
                answered = true;
                timer.cancel();
                if (answer.charAt(0) == question.correctAnswer) {
                    score++;
                }
            } else {
                System.out.println("Invalid option. Please select A, B, C, or D.");
            }
        }
    }

    private static void displayResults() {
        System.out.println("Quiz Over!");
        System.out.println("Your final score is: " + score + " out of " + questions.length);
        for (int i = 0; i < questions.length; i++) {
            question q = questions[i];
            System.out.println((i + 1) + ". " + q. question);
            System.out.println("Correct Answer: " + q.correctAnswer);
        }
    }
}
