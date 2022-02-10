/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/midlo_submissions": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.midlo_submissions.id"];
          created_at?: parameters["rowFilter.midlo_submissions.created_at"];
          guess_count?: parameters["rowFilter.midlo_submissions.guess_count"];
          user_id?: parameters["rowFilter.midlo_submissions.user_id"];
          hard_mode?: parameters["rowFilter.midlo_submissions.hard_mode"];
          wordle_id?: parameters["rowFilter.midlo_submissions.wordle_id"];
          wordle_board?: parameters["rowFilter.midlo_submissions.wordle_board"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["midlo_submissions"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** midlo_submissions */
          midlo_submissions?: definitions["midlo_submissions"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.midlo_submissions.id"];
          created_at?: parameters["rowFilter.midlo_submissions.created_at"];
          guess_count?: parameters["rowFilter.midlo_submissions.guess_count"];
          user_id?: parameters["rowFilter.midlo_submissions.user_id"];
          hard_mode?: parameters["rowFilter.midlo_submissions.hard_mode"];
          wordle_id?: parameters["rowFilter.midlo_submissions.wordle_id"];
          wordle_board?: parameters["rowFilter.midlo_submissions.wordle_board"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.midlo_submissions.id"];
          created_at?: parameters["rowFilter.midlo_submissions.created_at"];
          guess_count?: parameters["rowFilter.midlo_submissions.guess_count"];
          user_id?: parameters["rowFilter.midlo_submissions.user_id"];
          hard_mode?: parameters["rowFilter.midlo_submissions.hard_mode"];
          wordle_id?: parameters["rowFilter.midlo_submissions.wordle_id"];
          wordle_board?: parameters["rowFilter.midlo_submissions.wordle_board"];
        };
        body: {
          /** midlo_submissions */
          midlo_submissions?: definitions["midlo_submissions"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/submissions": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.submissions.id"];
          created_at?: parameters["rowFilter.submissions.created_at"];
          guess_count?: parameters["rowFilter.submissions.guess_count"];
          user_id?: parameters["rowFilter.submissions.user_id"];
          hard_mode?: parameters["rowFilter.submissions.hard_mode"];
          wordle_id?: parameters["rowFilter.submissions.wordle_id"];
          wordle_board?: parameters["rowFilter.submissions.wordle_board"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["submissions"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** submissions */
          submissions?: definitions["submissions"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.submissions.id"];
          created_at?: parameters["rowFilter.submissions.created_at"];
          guess_count?: parameters["rowFilter.submissions.guess_count"];
          user_id?: parameters["rowFilter.submissions.user_id"];
          hard_mode?: parameters["rowFilter.submissions.hard_mode"];
          wordle_id?: parameters["rowFilter.submissions.wordle_id"];
          wordle_board?: parameters["rowFilter.submissions.wordle_board"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.submissions.id"];
          created_at?: parameters["rowFilter.submissions.created_at"];
          guess_count?: parameters["rowFilter.submissions.guess_count"];
          user_id?: parameters["rowFilter.submissions.user_id"];
          hard_mode?: parameters["rowFilter.submissions.hard_mode"];
          wordle_id?: parameters["rowFilter.submissions.wordle_id"];
          wordle_board?: parameters["rowFilter.submissions.wordle_board"];
        };
        body: {
          /** submissions */
          submissions?: definitions["submissions"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/users": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.users.id"];
          username?: parameters["rowFilter.users.username"];
          last_login?: parameters["rowFilter.users.last_login"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["users"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** users */
          users?: definitions["users"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.users.id"];
          username?: parameters["rowFilter.users.username"];
          last_login?: parameters["rowFilter.users.last_login"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.users.id"];
          username?: parameters["rowFilter.users.username"];
          last_login?: parameters["rowFilter.users.last_login"];
        };
        body: {
          /** users */
          users?: definitions["users"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/words": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.words.id"];
          created_at?: parameters["rowFilter.words.created_at"];
          word?: parameters["rowFilter.words.word"];
          wordle_number?: parameters["rowFilter.words.wordle_number"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["words"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** words */
          words?: definitions["words"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.words.id"];
          created_at?: parameters["rowFilter.words.created_at"];
          word?: parameters["rowFilter.words.word"];
          wordle_number?: parameters["rowFilter.words.wordle_number"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.words.id"];
          created_at?: parameters["rowFilter.words.created_at"];
          word?: parameters["rowFilter.words.word"];
          wordle_number?: parameters["rowFilter.words.wordle_number"];
        };
        body: {
          /** words */
          words?: definitions["words"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
}

export interface definitions {
  midlo_submissions: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: smallint */
    guess_count?: number;
    /**
     * Format: uuid
     * @description Note:
     * This is a Foreign Key to `users.id`.<fk table='users' column='id'/>
     */
    user_id?: string;
    /** Format: boolean */
    hard_mode?: boolean;
    /**
     * Format: bigint
     * @description Note:
     * This is a Foreign Key to `words.id`.<fk table='words' column='id'/>
     */
    wordle_id?: number;
    /** Format: ARRAY */
    wordle_board?: unknown[];
  };
  submissions: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: smallint */
    guess_count?: number;
    /**
     * Format: uuid
     * @description Note:
     * This is a Foreign Key to `users.id`.<fk table='users' column='id'/>
     */
    user_id?: string;
    /** Format: boolean */
    hard_mode?: boolean;
    /**
     * Format: bigint
     * @description Note:
     * This is a Foreign Key to `words.id`.<fk table='words' column='id'/>
     */
    wordle_id?: number;
    /** Format: ARRAY */
    wordle_board?: unknown[];
  };
  users: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
    /** Format: text */
    username?: string;
    /** Format: timestamp without time zone */
    last_login?: string;
  };
  words: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: character varying */
    word: string;
    /** Format: smallint */
    wordle_number: number;
  };
}

export interface parameters {
  /** @description Preference */
  preferParams: "params=single-object";
  /** @description Preference */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /** @description Preference */
  preferCount: "count=none";
  /** @description Filtering Columns */
  select: string;
  /** @description On Conflict */
  on_conflict: string;
  /** @description Ordering */
  order: string;
  /** @description Limiting and Pagination */
  range: string;
  /**
   * @description Limiting and Pagination
   * @default items
   */
  rangeUnit: string;
  /** @description Limiting and Pagination */
  offset: string;
  /** @description Limiting and Pagination */
  limit: string;
  /** @description midlo_submissions */
  "body.midlo_submissions": definitions["midlo_submissions"];
  /** Format: bigint */
  "rowFilter.midlo_submissions.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.midlo_submissions.created_at": string;
  /** Format: smallint */
  "rowFilter.midlo_submissions.guess_count": string;
  /** Format: uuid */
  "rowFilter.midlo_submissions.user_id": string;
  /** Format: boolean */
  "rowFilter.midlo_submissions.hard_mode": string;
  /** Format: bigint */
  "rowFilter.midlo_submissions.wordle_id": string;
  /** Format: ARRAY */
  "rowFilter.midlo_submissions.wordle_board": string;
  /** @description submissions */
  "body.submissions": definitions["submissions"];
  /** Format: bigint */
  "rowFilter.submissions.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.submissions.created_at": string;
  /** Format: smallint */
  "rowFilter.submissions.guess_count": string;
  /** Format: uuid */
  "rowFilter.submissions.user_id": string;
  /** Format: boolean */
  "rowFilter.submissions.hard_mode": string;
  /** Format: bigint */
  "rowFilter.submissions.wordle_id": string;
  /** Format: ARRAY */
  "rowFilter.submissions.wordle_board": string;
  /** @description users */
  "body.users": definitions["users"];
  /** Format: uuid */
  "rowFilter.users.id": string;
  /** Format: text */
  "rowFilter.users.username": string;
  /** Format: timestamp without time zone */
  "rowFilter.users.last_login": string;
  /** @description words */
  "body.words": definitions["words"];
  /** Format: bigint */
  "rowFilter.words.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.words.created_at": string;
  /** Format: character varying */
  "rowFilter.words.word": string;
  /** Format: smallint */
  "rowFilter.words.wordle_number": string;
}

export interface operations {}

export interface external {}
