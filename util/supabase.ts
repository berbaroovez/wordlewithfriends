import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const signInWithDiscord = async () => {
  console.log("signInWithDiscord");
  const { user, session, error } = await supabase.auth.signIn({
    provider: "discord",
  });
  if (error) {
    console.error(error);
  }
};
const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
  }
};

interface Submission {
  wordleNumber: number;
  word: string;
  guessCount: number;
  hardMode: boolean;
  userId: string;
}

const submitSubmission = async (
  SubmissionInfo: Submission,
  wordleId: number
) => {
  const { data, error } = await supabase.from("submissions").insert({
    guess_count: SubmissionInfo.guessCount,
    hard_mode: SubmissionInfo.hardMode,
    user_id: SubmissionInfo.userId,
    wordle_id: wordleId,
  });
  if (error) {
    return {
      error: true,
      message: "Something went wrong with submission @ berb and yell at him",
    };
  } else {
    return {
      error: false,
      message: "Submission successful",
    };
  }
};

const checkWord = async (SubmissionInfo: Submission) => {
  const { data, error } = await supabase
    .from("words")
    .select()
    .match({ wordle_number: SubmissionInfo.wordleNumber });
  if (error) {
    return {
      error: true,
      message: "Error fetching word",
    };
  }
  if (data) {
    if (data.length === 0) {
      return {
        error: true,
        message: "That wordle number doesn't exist",
      };
    } else {
      if (data[0].word === SubmissionInfo.word.toLowerCase()) {
        return submitSubmission(SubmissionInfo, data[0].id);
      } else {
        return {
          error: true,
          message: "That is not the correct word for that wordle number",
        };
      }
    }
  } else {
    return {
      error: true,
      message: "Data doesnt exist @berb call him a idiot",
    };
  }
};

export { signInWithDiscord, signOut, checkWord };
export default supabase;
