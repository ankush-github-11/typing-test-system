import { Request, Response } from "express";
import { pool } from "../config/db";
import { GetTokensBody } from './../types/TypingTokenData';
export const getTokens = async (req : Request, res : Response) => {
    try{
        const{ token_type, difficulty }: GetTokensBody = req.body;
        const query = `
            SELECT *
            FROM typing_tokens
            WHERE token_type = ANY($1)
            AND difficulty = ANY($2)
            ORDER BY RANDOM()
        `;
        const values = [ token_type, difficulty ];
        const result = await pool.query(
            query,
            values
        );
        res.status(200).json(result.rows);
    }
    catch (err: unknown) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}