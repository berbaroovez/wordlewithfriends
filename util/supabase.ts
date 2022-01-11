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

const checkIfUserAlreadySubmitted = async (
  userId: string,
  wordleId: number
) => {
  const { data, error } = await supabase
    .from("submissions")
    .select()
    .match({ user_id: userId, wordle_id: wordleId });
  if (error) {
    console.error(error);
  }
  if (data) {
    if (data.length === 0) {
      return false;
    } else {
      return true;
    }
  }
};

const submitSubmission = async (
  SubmissionInfo: Submission,
  wordleId: number
) => {
  const hasUserSubmitted = await checkIfUserAlreadySubmitted(
    SubmissionInfo.userId,
    wordleId
  );

  if (!hasUserSubmitted) {
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
  } else {
    return {
      error: true,
      message: "You have already submitted a word for that wordle number",
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
      message: "Error fetching word @berb call yell at him",
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

const getUsersSubmissions = async (userId: string) => {
  const { data, error } = await supabase
    .from("submissions")
    .select()
    .match({ user_id: userId })
    .order("created_at", { ascending: false });

  console.log(data);
};
export { signInWithDiscord, signOut, checkWord, getUsersSubmissions };
export default supabase;
