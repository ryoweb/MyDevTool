"use client";

import { useState, useEffect, use } from "react";
import { Card, CardBody, Image, Button, Progress } from "@nextui-org/react";
import { HeartIcon } from "./HeartIcon";
import { PauseCircleIcon } from "./PauseCircleIcon";
import { NextIcon } from "./NextIcon";
import { PreviousIcon } from "./PreviousIcon";
import { RepeatOneIcon } from "./RepeatOneIcon";
import { ShuffleIcon } from "./ShuffleIcon";

export default function Music() {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const secretClient = process.env.NEXT_PUBLIC_SPOTIFY_SECRET_CLIENT;
    const redirectUri = 'http://localhost:3000/';

    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [authCode, setAuthCode] = useState<string | null>(null);
    const [trackUri, setTrackUri] = useState<any | null>(null);
    const [liked, setLiked] = useState<boolean>(false);

    // ユーザーの認証を行う
    useEffect(() => {
        if (!authCode) {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            if (code) {
                // 認証コードが取得できたらセット
                setAuthCode(code);
            } else {
                // 認証コードがない場合のみリダイレクトを行う
                window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
            }
        }
    }, [authCode, clientId, redirectUri]);

    //アクセストークンを取得
    useEffect(() => {
        if (authCode && !accessToken) {
            const fetchAccessToken = async () => {
                const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Basic ${btoa(`${clientId}:${secretClient}`)}`,
                    },
                    body: `grant_type=authorization_code&code=${authCode}&redirect_uri=${redirectUri}`,
                });

                const tokenData = await tokenResponse.json();
                setAccessToken(tokenData.access_token);
            }

            fetchAccessToken();
        }
    }, [authCode, accessToken, clientId, secretClient, redirectUri]);

    //再生中の曲の情報を取得する
    useEffect(() => {
        const fetchCurrentPlaying = async () => {
            const currentPlayingResponse = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setTrackUri(await currentPlayingResponse.json());
        }
        if (accessToken) {
            fetchCurrentPlaying();
        }
    }, [accessToken, trackUri]);

    //次の曲へ
    const nextTrack = async () => {
        await fetch('https://api.spotify.com/v1/me/player/next', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        //再生中の曲の情報を再度発火させるためにtrackUriのStateを変更する
        setTrackUri("");
    };
    //前の曲へ
    const previousTrack = async () => {
        await fetch('https://api.spotify.com/v1/me/player/previous', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        //再生中の曲の情報を再度発火させるためにtrackUriのStateを変更する
        setTrackUri("")
    };
    //曲を一時停止
    const pauseTrack = async () => {
        await fetch('https://api.spotify.com/v1/me/player/pause', {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    };
    //曲をランダムで再生
    const shuffleTrack = async () => {
        const currentPlayingResponse = await fetch('https://api.spotify.com/v1/me/player', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const currentPlayingData = await currentPlayingResponse.json();
        const shuffleState = !currentPlayingData.shuffle_state;

        await fetch(`https://api.spotify.com/v1/me/player/shuffle?state=${shuffleState}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    };
    //リピートにする
    const repeatTrack = async () => {
        const currentPlayingResponse = await fetch('https://api.spotify.com/v1/me/player', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const currentPlayingData = await currentPlayingResponse.json();
        const repeatState = currentPlayingData.repeat_state === "off" ? "context" : "off";

        await fetch(`https://api.spotify.com/v1/me/player/repeat?state=${repeatState}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    };
    //現在再生中の曲をお気に入りにする
    useEffect(() => {
        if (liked) {
            const fetchLiked = async () => {
                await fetch(`https://api.spotify.com/v1/me/tracks?ids=${trackUri?.item?.id}`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
            }
            fetchLiked();
        }
    }, [liked, accessToken, trackUri]);

    //シークバーのため、msを分秒に変換する関数を定義
    function formatTime(ms: number) {
        const minutes: number = Math.floor(ms / 60000);
        const seconds: number = ((ms % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    //シークバーのため、現在の曲の再生時間を取得する関数を定義
    function calculateDynamicValue() {
        return (trackUri?.progress_ms / trackUri?.item?.duration_ms) * 100;
    }

    return (
        <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[610px]"
            shadow="sm"
        >
            <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                    <div className="relative col-span-6 md:col-span-4">
                        <Image
                            alt="Album cover"
                            className="object-cover"
                            height={200}
                            shadow="md"
                            src={trackUri?.item?.album?.images[0]?.url ?? ""}
                            width="100%"
                        />
                    </div>

                    <div className="flex flex-col col-span-6 md:col-span-8">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-0">
                                <h3 className="font-semibold text-foreground/90">Playing Track</h3>
                                <h1 className="text-large font-medium mt-2">{trackUri?.item?.name ?? "No track"}</h1>
                            </div>
                            <Button
                                isIconOnly
                                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                                radius="full"
                                variant="light"
                                onPress={() => setLiked((v) => !v)}
                            >
                                <HeartIcon
                                    className={liked ? "[&>path]:stroke-transparent" : ""}
                                    fill={liked ? "currentColor" : "none"}
                                    onClick={() => setLiked((v) => !v)}
                                />
                            </Button>
                        </div>

                        <div className="flex flex-col mt-3 gap-1">
                            <Progress
                                aria-label="Music progress"
                                classNames={{
                                    indicator: "bg-default-800 dark:bg-white",
                                    track: "bg-default-500/30",
                                }}
                                color="default"
                                size="sm"
                                value={calculateDynamicValue()}
                            />
                            <div className="flex justify-between">
                                {/* <p className="text-small">1:23</p> */}
                                <p className="text-small text-foreground/50">{formatTime(trackUri?.item?.duration_ms ?? 0)}</p>
                            </div>
                        </div>

                        <div className="flex w-full items-center justify-center">
                            <Button
                                isIconOnly
                                className="data-[hover]:bg-foreground/10"
                                radius="full"
                                variant="light"
                            >
                                <RepeatOneIcon className="text-foreground/80" onClick={repeatTrack} />
                            </Button>
                            <Button
                                isIconOnly
                                className="data-[hover]:bg-foreground/10"
                                radius="full"
                                variant="light"
                            >
                                <PreviousIcon onClick={previousTrack} />
                            </Button>
                            <Button
                                isIconOnly
                                className="w-auto h-auto data-[hover]:bg-foreground/10"
                                radius="full"
                                variant="light"
                            >
                                <PauseCircleIcon size={54} onClick={pauseTrack} />
                            </Button>
                            <Button
                                isIconOnly
                                className="data-[hover]:bg-foreground/10"
                                radius="full"
                                variant="light"
                            >
                                <NextIcon onClick={nextTrack} />
                            </Button>
                            <Button
                                isIconOnly
                                className="data-[hover]:bg-foreground/10"
                                radius="full"
                                variant="light"
                            >
                                <ShuffleIcon className="text-foreground/80" onClick={shuffleTrack} />
                            </Button>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}